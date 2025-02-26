import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common'
import { CurrentUserDecorator } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') answerId: string,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    const { sub: authorId } = user

    const result = await this.deleteAnswer.execute({
      answerId,
      authorId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Delete,
} from '@nestjs/common'
import { CurrentUserDecorator } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestionComment: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @Param('id') questionCommentId: string,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    const { sub: authorId } = user

    const result = await this.deleteQuestionComment.execute({
      authorId,
      questionCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

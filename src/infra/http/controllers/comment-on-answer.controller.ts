import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUserDecorator } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'

const commentonAnswerBodySchema = z.object({
  content: z.string(),
})

type CommentOnAnswerBodySchema = z.infer<typeof commentonAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentonAnswerBodySchema)

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentonAnswer: CommentOnAnswerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('answerId') answerId: string,
    @Body(bodyValidationPipe) body: CommentOnAnswerBodySchema,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    const { content } = body
    const { sub: authorId } = user

    const result = await this.commentonAnswer.execute({
      content,
      answerId,
      authorId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

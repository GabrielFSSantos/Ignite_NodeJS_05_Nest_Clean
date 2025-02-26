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
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'

const commentonQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentonQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentonQuestionBodySchema)

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentonQuestion: CommentOnQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('questionId') questionId: string,
    @Body(bodyValidationPipe) body: CommentOnQuestionBodySchema,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    const { content } = body
    const { sub: authorId } = user

    const result = await this.commentonQuestion.execute({
      content,
      questionId,
      authorId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

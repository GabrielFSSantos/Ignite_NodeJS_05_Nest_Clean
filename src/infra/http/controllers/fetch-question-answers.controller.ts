import {
  Controller,
  HttpCode,
  Get,
  Query,
  BadRequestException,
  Param,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { AnswerPresenter } from '../presenters/answer-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions/:quetionId/answers')
export class FetchQuestionAnswersController {
  constructor(
    private fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase,
  ) {}

  @Get()
  @HttpCode(201)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswersUseCase.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers

    return {
      answers: answers.map(AnswerPresenter.toHTTP),
    }
  }
}

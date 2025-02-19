import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questioncomments: QuestionComment[]
  }
>

export class FetchQuestionQuestionCommentsUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionQuestionCommentsUseCaseRequest): Promise<FetchQuestionQuestionCommentsUseCaseResponse> {
    const questioncomments =
      await this.questioncommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questioncomments,
    })
  }
}

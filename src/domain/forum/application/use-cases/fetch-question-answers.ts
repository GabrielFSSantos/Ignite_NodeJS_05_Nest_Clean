import { Either, right } from '@/core/either'
import { AnswerWithAuthor } from '../../enterprise/entities/value-objects/answer-with-author'
import { AnswersRepository } from '../repositories/answers-repository'
import { Injectable } from '@nestjs/common'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: AnswerWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionIdWithAuthor(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}

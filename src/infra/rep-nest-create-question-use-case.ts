import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { Injectable } from '@nestjs/common'

/*
 Usaria no lugar de CreateQuestionUseCase nos Controllers.
 Evintando colocar @Injectable no CreateQuestionUseCase
 Dessa forma usando ele como provider nos Modules
 Obs: O mesmo para todos os UseCases
*/
@Injectable()
export class NestCreateQuestionUseCase extends CreateQuestionUseCase {
  constructor(questionsRepository: QuestionsRepository) {
    super(questionsRepository)
  }
}

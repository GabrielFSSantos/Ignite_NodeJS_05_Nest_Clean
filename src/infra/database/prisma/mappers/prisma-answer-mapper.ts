import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityId(raw.questionId),
        authorId: new UniqueEntityId(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      questionId: raw.authorId.toString(),
      authorId: raw.authorId.toString(),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }
}

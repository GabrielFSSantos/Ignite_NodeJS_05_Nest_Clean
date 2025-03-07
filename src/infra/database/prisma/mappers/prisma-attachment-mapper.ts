import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      url: raw.url,
    }
  }
}

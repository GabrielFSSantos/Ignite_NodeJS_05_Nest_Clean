import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { CurrentUserDecorator } from 'src/auth/current-user.decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: authorId } = user

    const slug = this.convertToSlog(title)

    await this.prisma.question.create({
      data: {
        authorId,
        title,
        content,
        slug,
      },
    })
  }

  private convertToSlog(title: string): string {
    return title
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s/g, '-')
  }
}

import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard'
import { CurrentUserDecorator } from 'src/auth/current-user.decorator'
import { UserPayload } from 'src/auth/jwt.strategy'

const createQuestionBodySchema = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  authorId: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createQuestionBodySchema))
  async handle(
    @Body() body: CreateQuestionBodySchema,
    @CurrentUserDecorator() user: UserPayload,
  ) {
    return {
      body,
      user,
    }
  }
}

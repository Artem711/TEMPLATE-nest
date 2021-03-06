import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { PostModel } from '@server/routes/models'

@InputType()
export class CreatePostInput extends PickType(
  PostModel,
  ['title', 'content'] as const,
  InputType
) {}

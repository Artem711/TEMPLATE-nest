import { InputType, PickType } from '@nestjs/graphql'
import { UserModel } from '@server/routes/models/user.model'

@InputType()
export class UpdateUserInput extends PickType(
  UserModel,
  ['firstName', 'lastName'] as const,
  InputType
) {}

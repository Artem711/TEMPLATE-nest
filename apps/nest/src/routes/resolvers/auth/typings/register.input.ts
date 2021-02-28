import { InputType, PickType } from '@nestjs/graphql'
import { UserModel } from '@server/routes/models'

@InputType()
export class RegisterInput extends PickType(
  UserModel,
  ['firstName', 'lastName', 'password', 'email'] as const,
  InputType
) {}

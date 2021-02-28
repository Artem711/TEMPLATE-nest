import { Field, ObjectType, PickType } from '@nestjs/graphql'
import { UserModel } from '@server/routes/models/user.model'

@ObjectType()
export class TokenModel extends PickType(UserModel, ['id'] as const) {
  @Field({ description: 'JWT access token' })
  accessToken: string

  @Field({ description: 'JWT refresh token' })
  refreshToken: string
}

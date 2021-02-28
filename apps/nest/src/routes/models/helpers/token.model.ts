import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TokenModel {
  @Field({ description: 'JWT access token' })
  accessToken: string

  @Field({ description: 'JWT refresh token' })
  refreshToken: string
}

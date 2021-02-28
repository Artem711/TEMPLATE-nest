// # PLUGINS IMPORTS //
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { UserRole } from '@prisma/client'

// # EXTRA IMPORTS //
import { PostModel } from './post.model'
import { BaseModel } from './common/base.model'

/////////////////////////////////////////////////////////////////////////////

registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType()
export class UserModel extends BaseModel {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @Field(() => String)
  firstName: string

  @Field(() => String)
  lastName: string

  @Field(() => [PostModel], { nullable: 'items' })
  posts?: Array<PostModel>

  @Field(() => UserRole)
  role: UserRole
}

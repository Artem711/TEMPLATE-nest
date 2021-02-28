// # PLUGINS IMPORTS //
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { UserRole } from '@prisma/client'

// # EXTRA IMPORTS //
import { PostModel } from './post.model'
import { BaseModel } from './common/base.model'

/////////////////////////////////////////////////////////////////////////////

registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType()
export class UserModel extends BaseModel {
  @Field(() => String)
  email: string

  @Field(() => String)
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

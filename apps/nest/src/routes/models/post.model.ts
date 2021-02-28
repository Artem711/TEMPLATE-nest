// # PLUGINS IMPORTS //
import { Field, ID, ObjectType } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { BaseModel } from './common/base.model'

/////////////////////////////////////////////////////////////////////////////

@ObjectType()
export class PostModel extends BaseModel {
  @Field(() => String)
  title: string

  @Field(() => String)
  content: string

  @Field(() => ID)
  authorId: string

  @Field(() => Boolean)
  published: boolean
}

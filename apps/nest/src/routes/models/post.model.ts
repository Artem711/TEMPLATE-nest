// # PLUGINS IMPORTS //
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, MinLength } from 'class-validator'

// # EXTRA IMPORTS //
import { BaseModel } from './common/base.model'

/////////////////////////////////////////////////////////////////////////////

@ObjectType()
export class PostModel extends BaseModel {
  @Field()
  @IsNotEmpty()
  title: string

  @Field()
  @IsNotEmpty()
  @MinLength(10)
  content: string

  @Field(() => ID)
  authorId: string

  @Field(() => Boolean)
  published: boolean
}

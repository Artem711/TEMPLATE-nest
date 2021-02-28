// # PLUGINS IMPORTS //
import { Field, ID, ObjectType } from '@nestjs/graphql'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: string
  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date
  @Field({
    description:
      'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date
}

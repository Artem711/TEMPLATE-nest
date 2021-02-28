import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  firstname?: string
  @Field(() => String, { nullable: true })
  lastname?: string
}

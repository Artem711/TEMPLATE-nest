// # PLUGINS IMPORTS //
import {
  Mutation,
  Resolver,
  Args,
  ID,
  ResolveField,
  Parent,
  ObjectType,
  Field,
} from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { TokenModel, UserModel } from '@server/routes/models'

import { RegisterInput } from './typings'

/////////////////////////////////////////////////////////////////////////////

@ObjectType()
export class AuthReturn extends TokenModel {
  @Field(() => UserModel)
  user?: UserModel
}

@Resolver(() => AuthReturn)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthReturn)
  async registerUser(@Args('data') data: RegisterInput): Promise<AuthReturn> {
    data.email = data.email.toLowerCase()
    const response = await this.authService.registerUser(data)
    return response
  }

  @Mutation(() => AuthReturn)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<AuthReturn> {
    const response = await this.authService.loginUser(
      email.toLowerCase(),
      password
    )
    return response
  }

  @Mutation(() => UserModel)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string
  ): Promise<UserModel> {
    const response = await this.authService.deleteUser(id)
    return response
  }

  @Mutation(() => AuthReturn)
  async refreshToken(@Args('token') token: string): Promise<AuthReturn> {
    return this.authService.refreshToken(token)
  }

  @ResolveField('user')
  async user(@Parent() auth: AuthReturn): Promise<UserModel> {
    return await this.authService.getUserFromToken(auth.accessToken)
  }
}

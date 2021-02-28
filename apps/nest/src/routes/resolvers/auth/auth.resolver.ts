// # PLUGINS IMPORTS //
import { Mutation, Resolver, Args, ID } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { TokenModel, UserModel } from '@server/routes/models'

import { RegisterInput } from './dto'

/////////////////////////////////////////////////////////////////////////////

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenModel)
  async registerUser(@Args('data') data: RegisterInput): Promise<TokenModel> {
    data.email = data.email.toLowerCase()
    const response = await this.authService.registerUser(data)
    return response
  }

  @Mutation(() => TokenModel)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<TokenModel> {
    const response = await this.authService.loginUser(email, password)
    return response
  }

  @Mutation(() => UserModel)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string
  ): Promise<UserModel> {
    return await this.authService.deleteUser(id)
  }
}

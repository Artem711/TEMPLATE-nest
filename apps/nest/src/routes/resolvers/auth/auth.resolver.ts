// # PLUGINS IMPORTS //
import { Mutation, Resolver, Args } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { TokenModel } from '@server/routes/models'

import { RegisterInput } from './dto'

/////////////////////////////////////////////////////////////////////////////

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenModel)
  async register(@Args('data') data: RegisterInput): Promise<TokenModel> {
    data.email = data.email.toLowerCase()
    const { accessToken, refreshToken } = await this.authService.register(data)
    return { accessToken, refreshToken }
  }
}

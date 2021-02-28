// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'
import { PasswordService, PrismaService } from '@server/routes/services'
import { AuthService } from '@server/routes/services/auth.service'

import { GqlAuthGuard } from '@server/common/guards'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './utils/jwt-strategy'

/////////////////////////////////////////////////////////////////////////////

const AuthModuleImports = [Providers.PassportProvider, Providers.JWTProvider]
const AuthModuleProviders = [
  AuthService,
  AuthResolver,
  JwtStrategy,
  GqlAuthGuard,
  PasswordService,
  PrismaService,
]
const AuthModuleExports = [GqlAuthGuard]

export const AuthModuleConfig = {
  imports: AuthModuleImports,
  providers: AuthModuleProviders,
  exports: AuthModuleExports,
}
@Module(AuthModuleConfig)
export class AuthModule {}

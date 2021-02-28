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

@Module({
  imports: [Providers.PassportProvider, Providers.JWTProvider],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
    PrismaService,
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule {}

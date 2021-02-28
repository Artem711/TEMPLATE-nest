// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

// # EXTRA IMPORTS //
import { PasswordService, PrismaService } from '@server/routes/services'
import { AuthService } from '@server/routes/services/auth.service'

import { AuthResolver } from './auth.resolver'
import { GqlAuthGuard } from '@server/common/guards'
import { SecurityConfig } from '@server/config/constants/config.types'
import { JwtStrategy } from './utils/jwt-strategy'

/////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security')
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
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

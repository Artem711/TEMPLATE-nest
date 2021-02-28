import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SecurityConfig } from '../constants/config.types'

export const JWTProvider = JwtModule.registerAsync({
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
})

// # PLUGINS IMPORTS //
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Strategy, ExtractJwt } from 'passport-jwt'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { JWTType } from '../typings'

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate(payload: JWTType): Promise<User> {
    const user = await this.authService._validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

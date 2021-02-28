// # PLUGINS IMPORTS //
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { JwtDto } from '../dto'

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

  async validate(payload: JwtDto): Promise<User> {
    const user = await this.authService._validateUser(payload.userId)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

// # PLUGINS IMPORTS //
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'

// # EXTRA IMPORTS //
import { PasswordService } from './password.service'
import { PrismaService } from './prisma.service'
import { TokenModel, UserModel } from '@server/routes/models'
import { SecurityConfig } from '@server/config/constants/config.types'
import { RegisterInput } from '../resolvers/auth/typings'

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthService {
  constructor(
    /**
     * @description JWT Service
     * @function sign() // based on any object => create a hash
     *    @returns the hash
     * @function verify() // decode the hash => to get the original object
     *    @returns the original data
     */
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async registerUser(payload: RegisterInput): Promise<TokenModel> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    )

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          role: 'USER',
        },
      })

      return this._generateToken({
        userId: user.id,
      })
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`)
      } else {
        throw new Error(e)
      }
    }
  }

  async loginUser(email: string, password: string): Promise<TokenModel> {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    )

    if (!passwordValid) {
      throw new BadRequestException('Invalid password')
    }

    return this._generateToken({ userId: user.id })
  }

  async deleteUser(id: string): Promise<UserModel> {
    const user = await this.prisma.user.delete({ where: { id } })
    return user
  }

  getUserFromToken(token: string): Promise<UserModel> {
    const id = this.jwtService.decode(token)['userId']
    return this.prisma.user.findUnique({ where: { id } })
  }

  refreshToken(token: string): TokenModel {
    try {
      const { userId } = this.jwtService.verify(token)
      return this._generateToken({ userId })
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  _validateUser(userId: string): Promise<UserModel> {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }

  _generateToken(payload: { userId: string }): TokenModel {
    const accessToken = this.jwtService.sign(payload)

    const securityConfig = this.configService.get<SecurityConfig>('security')
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: securityConfig.refreshIn,
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}

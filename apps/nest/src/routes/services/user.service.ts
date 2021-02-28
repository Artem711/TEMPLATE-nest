// # PLUGINS IMPORTS //
import { Injectable } from '@nestjs/common'
import { UserInputError } from 'apollo-server-express'

// # EXTRA IMPORTS //
import { PrismaService, PasswordService } from '@server/routes/services'
import { UserModel } from '@server/routes/models'
import {
  ChangePasswordInput,
  UpdateUserInput,
} from '@server/routes/resolvers/user/typings'

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly prisma: PrismaService
  ) {}

  async getUser(id: string): Promise<UserModel> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async changeUserPassword(
    id: string,
    realPassword: string,
    input: ChangePasswordInput
  ): Promise<UserModel> {
    const isValidPassword = await this.passwordService.validatePassword(
      input.oldPassword,
      realPassword
    )

    if (!isValidPassword) {
      throw new UserInputError('Invalid password')
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.newPassword
    )

    return await this.prisma.user.update({
      data: { password: hashedPassword },
      where: { id },
    })
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<UserModel> {
    return await this.prisma.user.update({ data, where: { id } })
  }
}

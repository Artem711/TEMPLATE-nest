// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'
import {
  PasswordService,
  PrismaService,
  UserService,
} from '@server/routes/services'
import { UserResolver } from './user.resolver'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

const UserModuleProviders = [
  UserResolver,
  UserService,
  PasswordService,
  PrismaService,
]

export const UserModuleConfig = {
  providers: UserModuleProviders,
}

@Module(UserModuleConfig)
export class UserModule {}

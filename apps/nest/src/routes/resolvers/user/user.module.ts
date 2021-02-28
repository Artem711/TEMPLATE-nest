// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'

// # EXTRA IMPORTS //
import { UserResolver } from './user.resolver'
import {
  PasswordService,
  PrismaService,
  UserService,
} from '@server/routes/services'

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

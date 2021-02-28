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

@Module({
  providers: [UserResolver, UserService, PasswordService, PrismaService],
})
export class UserModule {}

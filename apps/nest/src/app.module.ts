// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'
import * as Scalars from '@server/common/scalars'

import { AppController } from '@server/routes/controllers'

import { PostModule } from '@server/routes/resolvers/post/post.module'
import { UserModule } from '@server/routes/resolvers/user/user.module'
import { AuthModule } from '@server/routes/resolvers/auth/auth.module'

/////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [
    Providers.ConfigProvider,
    Providers.GraphQLProvider,
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [Scalars.DateScalar],
})
export class AppModule {}

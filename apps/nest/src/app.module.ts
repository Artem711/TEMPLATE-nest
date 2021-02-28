// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'

import { AppController } from '@server/routes/controllers'
import { AppService } from '@server/routes/services'

import { PostModule } from '@server/routes/resolvers/post/post.module'
import { UserModule } from '@server/routes/resolvers/user/user.module'
import { AuthModule } from '@server/routes/resolvers/auth/auth.module'
import { AppResolver } from '@server/routes/resolvers/app/app.resolver'

/////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [
    Providers.ConfigProvider,
    Providers.GraphQLProvider,
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

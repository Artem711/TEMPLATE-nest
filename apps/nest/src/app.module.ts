// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { Constants, IConstants } from '@server/config'

import { AppController } from '@server/routes/controllers'
import { AppService } from '@server/routes/services'

import { AuthModule } from '@server/routes/resolvers/auth/auth.module'
import { PostModule } from '@server/routes/resolvers/post/post.module'
import { UserModule } from '@server/routes/resolvers/user/user.module'

/////////////////////////////////////////////////////////////////////////////

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [Constants] }),

    GraphQLModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const graphqlConfig = config.get<IConstants.GraphqlConfig>('graphql')
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination || './schema.graphql',
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

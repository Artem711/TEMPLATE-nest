import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { ConstantsTypes } from '@server/config'

export const GraphQLProvider = GraphQLModule.forRootAsync({
  useFactory: async (config: ConfigService) => {
    const graphqlConfig = config.get<ConstantsTypes.GraphqlConfig>('graphql')
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
})

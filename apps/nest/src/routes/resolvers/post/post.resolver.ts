// # PLUGINS IMPORTS //
import { Resolver, Query } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { PostModel } from '@server/routes/models'

/////////////////////////////////////////////////////////////////////////////

@Resolver()
export class PostResolver {
  @Query(() => [PostModel])
  async getPosts(): Promise<Array<PostModel>> {
    return []
  }
}

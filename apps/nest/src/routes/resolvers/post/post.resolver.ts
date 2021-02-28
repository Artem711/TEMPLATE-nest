// # PLUGINS IMPORTS //
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { PostModel, UserModel } from '@server/routes/models'
import { PostService } from '@server/routes/services'
import { CreatePostInput } from './dto/create-post.input'

import { GqlAuthGuard } from '@server/common/guards'
import { UserEntity } from '@server/common/decorators'

/////////////////////////////////////////////////////////////////////////////

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PostModel)
  async createPost(
    @UserEntity() user: UserModel,
    @Args('data', { type: () => CreatePostInput }) data: CreatePostInput
  ): Promise<PostModel> {
    console.log(user, 'user')
    return await this.postService.createPost({ ...data, authorId: user.id })
  }

  @Query(() => [PostModel])
  async getPostsByUser(
    @Args('userId', { type: () => ID }) userId: string
  ): Promise<Array<PostModel>> {
    return await this.postService.getPostsByUser(userId)
  }

  @Query(() => PostModel)
  async getPostById(
    @Args('id', { type: () => ID }) id: string
  ): Promise<PostModel> {
    return await this.postService.getPostById(id)
  }
}

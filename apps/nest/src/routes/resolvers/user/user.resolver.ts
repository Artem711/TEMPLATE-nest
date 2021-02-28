// # PLUGINS IMPORTS //
import { UseGuards } from '@nestjs/common'
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql'

// # EXTRA IMPORTS //
import { PostModel, UserModel } from '@server/routes/models'
import { PrismaService, UserService } from '@server/routes/services'

import { GqlAuthGuard } from '@server/common/guards'
import { UserEntity } from '@server/common/decorators'
import { ChangePasswordInput, UpdateUserInput } from './dto'

/////////////////////////////////////////////////////////////////////////////

@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserModel)
  async getUser(
    @Args('id', { type: () => ID }) id: string
  ): Promise<UserModel> {
    return await this.userService.getUser(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async updateUser(
    @UserEntity() user: UserModel,
    @Args('newData', { type: () => UpdateUserInput }) newData: UpdateUserInput
  ): Promise<UserModel> {
    return await this.userService.updateUser(user.id, newData)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserModel)
  async changeUserPassword(
    @UserEntity() user: UserModel,
    @Args('input') input: ChangePasswordInput
  ): Promise<UserModel> {
    return this.userService.changeUserPassword(user.id, user.password, input)
  }

  @ResolveField('posts', () => [PostModel])
  async posts(@Parent() author: UserModel): Promise<Array<PostModel>> {
    return await this.prisma.user
      .findUnique({ where: { id: author.id } })
      .posts()
  }
}
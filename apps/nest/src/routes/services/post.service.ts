// # PLUGINS IMPORTS //
import { Injectable } from '@nestjs/common'

// # EXTRA IMPORTS //
import { PrismaService } from './prisma.service'
import { PostModel } from '@server/routes/models/post.model'

import { CreatePostInput } from '@server/routes/resolvers/post/typings'

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(
    data: CreatePostInput & Pick<PostModel, 'authorId'>
  ): Promise<PostModel> {
    return await this.prisma.post.create({ data })
  }

  async getPostsByUser(userId: string): Promise<Array<PostModel>> {
    return await this.prisma.post.findMany({ where: { authorId: userId } })
  }

  async getPostById(id: string): Promise<PostModel> {
    return await this.prisma.post.findUnique({ where: { id } })
  }
}

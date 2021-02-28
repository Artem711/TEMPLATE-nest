// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'

// # EXTRA IMPORTS //
import { PrismaService } from '@server/routes/services'
import { PostService } from '@server/routes/services'
import { PostResolver } from './post.resolver'

/////////////////////////////////////////////////////////////////////////////

const PostModuleProviders = [PostResolver, PostService, PrismaService]
export const PostModuleConfig = { providers: PostModuleProviders }

@Module(PostModuleConfig)
export class PostModule {}

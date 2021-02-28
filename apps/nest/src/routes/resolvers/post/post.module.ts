// # PLUGINS IMPORTS //
import { Module } from '@nestjs/common'
import { PrismaService } from '@server/routes/services'
import { PostService } from '@server/routes/services'
import { PostResolver } from './post.resolver'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@Module({
  providers: [PostResolver, PostService, PrismaService],
})
export class PostModule {}

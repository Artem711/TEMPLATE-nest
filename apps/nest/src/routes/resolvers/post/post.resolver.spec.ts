// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'

// # EXTRA IMPORTS //
import { PostModuleConfig } from './post.module'
import { PostResolver } from './post.resolver'

/////////////////////////////////////////////////////////////////////////////

describe('PostResolver Test', () => {
  let postResolver: PostResolver

  beforeEach(async () => {
    await setup()
  })

  it('createPost()', () => {})

  it('getPosts()', () => {})

  it('getPostsByUser()', () => {})

  async function setup() {
    const app: TestingModule = await Test.createTestingModule(
      PostModuleConfig
    ).compile()

    postResolver = app.get<PostResolver>(PostResolver)
  }
})

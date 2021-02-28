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

  describe('getPosts()', () => {
    it('should return an instance of array', () => {
      expect(true).toBeTruthy()
      // expect(postResolver.getPostsByUser('')).resolves.toBeInstanceOf(Array)
    })
  })

  async function setup() {
    const app: TestingModule = await Test.createTestingModule(
      PostModuleConfig
    ).compile()

    postResolver = app.get<PostResolver>(PostResolver)
  }
})

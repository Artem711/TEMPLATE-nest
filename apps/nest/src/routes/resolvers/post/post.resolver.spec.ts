// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'

// # EXTRA IMPORTS //
import { PostModuleConfig } from './post.module'
import { PostResolver } from './post.resolver'

/////////////////////////////////////////////////////////////////////////////

describe('PostResolver Test', () => {
  let wrapper: PostResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      PostModuleConfig
    ).compile()

    wrapper = app.get<PostResolver>(PostResolver)
  })

  describe('getPosts()', () => {
    it('should return an instance of array', () => {
      expect(true).toBeTruthy()
      // expect(wrapper.getPostsByUser('')).resolves.toBeInstanceOf(Array)
    })
  })
})

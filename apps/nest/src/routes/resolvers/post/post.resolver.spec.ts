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
      expect(wrapper.getPosts()).resolves.toBeInstanceOf(Array)
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { PostResolver } from './post.resolver'
import { PostService } from '@server/routes/services'

describe('PostResolver Test', () => {
  let wrapper: PostResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PostResolver, PostService],
    }).compile()

    wrapper = app.get<PostResolver>(PostResolver)
  })

  describe('getPosts()', () => {
    it('should return an instance of array', () => {
      expect(wrapper.getPosts()).resolves.toBeInstanceOf(Array)
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from '@server/routes/controllers'
import { AppService } from '@server/routes/services'

const string = [...Array(10)]
  .map((i) => (~~(Math.random() * 36)).toString(36))
  .join('')

describe('AppController Test', () => {
  let wrapper: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    wrapper = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return `Some word + {name}`', () => {
      expect(wrapper.getWord(string)).toBe(`Some word${string}`)
    })
  })
})

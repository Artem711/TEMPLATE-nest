import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from '@server/routes/controllers'

const string = [...Array(10)]
  .map((i) => (~~(Math.random() * 36)).toString(36))
  .join('')

describe('AppController Test', () => {
  let wrapper: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    wrapper = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return `Some word + {name}`', () => {
      expect(wrapper.getWord(string)).toBe(string)
    })
  })
})

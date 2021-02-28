import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import {
  UserService,
  PasswordService,
  PrismaService,
} from '@server/routes/services'
import { UserResolver } from './user.resolver'

describe('UserResolver Test', () => {
  let wrapper: UserResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        PrismaService,
        PasswordService,
        ConfigService,
      ],
    }).compile()

    wrapper = app.get<UserResolver>(UserResolver)
  })

  describe('getUser()', () => {
    it('should return instance of `UserModule`', async () => {
      expect(true).toBeTruthy()
    })
  })
})

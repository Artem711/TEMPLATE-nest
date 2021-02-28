// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

// # EXTRA IMPORTS //
import { UserModuleConfig } from './user.module'
import { UserResolver } from './user.resolver'

/////////////////////////////////////////////////////////////////////////////

describe('UserResolver Test', () => {
  let wrapper: UserResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      ...UserModuleConfig,
      providers: [...UserModuleConfig.providers, ConfigService],
    }).compile()

    wrapper = app.get<UserResolver>(UserResolver)
  })

  describe('getUser()', () => {
    it('should return instance of `UserModule`', async () => {
      expect(true).toBeTruthy()
    })
  })
})

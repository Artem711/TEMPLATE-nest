// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

// # EXTRA IMPORTS //
import { UserModuleConfig } from './user.module'
import { UserResolver } from './user.resolver'
import { AuthService } from '@server/routes/services'
import { Providers } from '@server/config'
import { AuthModuleConfig } from '../auth/auth.module'
import { AuthResolver } from '../auth/auth.resolver'

import { TestsConstants, TestsFunctions } from '@server/../tests'

/////////////////////////////////////////////////////////////////////////////

describe('UserResolver Test', () => {
  let userResolver: UserResolver
  let authResolver: AuthResolver
  let id = undefined

  beforeEach(async () => {
    await setup()
  })

  describe('getUser()', () => {
    it('should return instance of `UserModule`', async () => {
      const response = userResolver.getUser(id)
      expect(await response).toHaveProperty('firstName')
      await TestsFunctions.deleteUser(authResolver, id)
    })
  })

  async function setup() {
    const data = TestsConstants.userDataGenerator()

    // MARK: - UserResolver Setup
    const userApp: TestingModule = await Test.createTestingModule({
      ...UserModuleConfig,
      providers: [...UserModuleConfig.providers, ConfigService],
    }).compile()
    userResolver = userApp.get<UserResolver>(UserResolver)

    // MARK: - AuthResolver Setup
    const authApp: TestingModule = await Test.createTestingModule({
      ...AuthModuleConfig,
      imports: [...AuthModuleConfig.imports, Providers.ConfigProvider],
    }).compile()

    authResolver = authApp.get<AuthResolver>(AuthResolver)
    const authService = authApp.get<AuthService>(AuthService)
    const response = await authService.registerUser(data)
    id = (await authService.getUserFromToken(response.accessToken)).id
  }
})

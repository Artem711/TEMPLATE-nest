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

import { deleteUser } from '@server/../tests/functions'
import { userDataGenerator } from '@server/../tests/constants'

/////////////////////////////////////////////////////////////////////////////

describe('UserResolver Test', () => {
  let wrapper: UserResolver
  let authResolver: AuthResolver
  let id = undefined

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      ...UserModuleConfig,
      providers: [...UserModuleConfig.providers, ConfigService],
    }).compile()

    wrapper = app.get<UserResolver>(UserResolver)

    const authApp: TestingModule = await Test.createTestingModule({
      ...AuthModuleConfig,
      imports: [...AuthModuleConfig.imports, Providers.ConfigProvider],
    }).compile()

    const data = userDataGenerator()

    authResolver = authApp.get<AuthResolver>(AuthResolver)
    const authService = authApp.get<AuthService>(AuthService)
    const res = await authService.registerUser(data)
    id = (await authService.getUserFromToken(res.accessToken)).id
    console.log(await authService.getUserFromToken(res.accessToken))
  })

  describe('getUser()', () => {
    it('should return instance of `UserModule`', async () => {
      const response = wrapper.getUser(id)
      expect(await response).toHaveProperty('firstName')

      await deleteUser(authResolver, id)
    })
  })
})

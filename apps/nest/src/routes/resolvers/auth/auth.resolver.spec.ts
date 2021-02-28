// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'

import { AuthResolver } from './auth.resolver'
import { AuthModuleConfig } from './auth.module'
import { AuthService } from '@server/routes/services'

import { TestsFunctions, TestsConstants } from '@server/../tests'

/////////////////////////////////////////////////////////////////////////////

describe('AuthResolver Test', () => {
  let authResolver: AuthResolver
  let authService: AuthService

  beforeEach(async () => {
    await setup()
  })

  describe('registerUser() and deleteUser()', () => {
    const data = TestsConstants.userDataGenerator()
    it('should (register & delete user) succesfully', async () => {
      const response = await TestsFunctions.registerUser(authResolver, data)
      expect(Object.keys(response)).toEqual(['accessToken', 'refreshToken'])

      const user = await authService.getUserFromToken(response.accessToken)
      delete user.password
      delete data.password

      expect(user).toMatchObject(data)

      const deleteResponse = await TestsFunctions.deleteUser(
        authResolver,
        user.id
      )
      expect(deleteResponse).toHaveProperty(['id'])
      expect(deleteResponse.id).toEqual(user.id)
    })
  })

  describe('login()', () => {
    it('should (register & login & delete user) succesfully', async () => {
      const data = TestsConstants.userDataGenerator()

      const regResponse = await TestsFunctions.registerUser(authResolver, data)
      const loginResponse = await authResolver.loginUser(
        data.email,
        data.password
      )
      expect(regResponse.accessToken).toEqual(loginResponse.accessToken)

      const regUser = await authService.getUserFromToken(
        regResponse.accessToken
      )
      const logUser = await authService.getUserFromToken(
        loginResponse.accessToken
      )
      expect(regUser).toEqual(logUser)

      TestsFunctions.deleteUser(authResolver, logUser.id)
    })
  })

  async function setup() {
    const app: TestingModule = await Test.createTestingModule({
      ...AuthModuleConfig,
      imports: [...AuthModuleConfig.imports, Providers.ConfigProvider],
    }).compile()

    authResolver = app.get<AuthResolver>(AuthResolver)
    authService = app.get<AuthService>(AuthService)
  }
})

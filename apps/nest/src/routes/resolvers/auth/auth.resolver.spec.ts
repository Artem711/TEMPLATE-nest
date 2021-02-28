// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'

import { AuthResolver } from './auth.resolver'
import { AuthModuleConfig } from './auth.module'
import { AuthService } from '@server/routes/services'

import { registerUser, deleteUser } from '@server/../tests/functions'

import { userDataGenerator } from '@server/../tests/constants'

/////////////////////////////////////////////////////////////////////////////

describe('AuthResolver Test', () => {
  let wrapper: AuthResolver
  let service: AuthService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      ...AuthModuleConfig,
      imports: [...AuthModuleConfig.imports, Providers.ConfigProvider],
    }).compile()

    wrapper = app.get<AuthResolver>(AuthResolver)
    service = app.get<AuthService>(AuthService)
  })

  describe('registerUser() and deleteUser()', () => {
    const data = userDataGenerator()
    it('should (register & delete user) succesfully', async () => {
      const response = await registerUser(wrapper, data)
      expect(Object.keys(response)).toEqual(['accessToken', 'refreshToken'])

      const user = await service.getUserFromToken(response.accessToken)
      delete user.password
      delete data.password

      expect(user).toMatchObject(data)

      const deleteResponse = await deleteUser(wrapper, user.id)
      expect(deleteResponse).toHaveProperty(['id'])
      expect(deleteResponse.id).toEqual(user.id)
    })
  })

  describe('login()', () => {
    it('should (register & login & delete user) succesfully', async () => {
      const data = userDataGenerator()

      const regResponse = await registerUser(wrapper, data)
      const loginResponse = await wrapper.loginUser(data.email, data.password)
      expect(regResponse.accessToken).toEqual(loginResponse.accessToken)

      const regUser = await service.getUserFromToken(regResponse.accessToken)
      const logUser = await service.getUserFromToken(loginResponse.accessToken)
      expect(regUser).toEqual(logUser)

      deleteUser(wrapper, logUser.id)
    })
  })
})

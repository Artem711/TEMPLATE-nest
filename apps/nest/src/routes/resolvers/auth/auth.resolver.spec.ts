// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'

// # EXTRA IMPORTS //
import { Providers } from '@server/config'

import { AuthResolver } from './auth.resolver'
import { AuthModuleConfig } from './auth.module'
import { AuthService } from '@server/routes/services'
import { RegisterInput } from './dto'

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
    const data = {
      email: 'test1@gmail.com',
      firstName: 'Artem',
      lastName: 'Moshnin',
      password: '12345678',
    }

    it('should (register & delete user) succesfully', async () => {
      const response = await registerUser(data)
      expect(Object.keys(response)).toEqual(['accessToken', 'refreshToken'])

      const user = await service.getUserFromToken(response.accessToken)
      delete user.password
      delete data.password

      expect(user).toMatchObject(data)
      deleteUser(user.id)
    })
  })

  describe('login()', () => {
    const data = {
      email: 'test3@gmail.com',
      firstName: 'Artem',
      lastName: 'Moshnin',
      password: '12345678',
    }

    it('should (register & login & delete user) succesfully', async () => {
      const regResponse = await registerUser(data)
      const loginResponse = await wrapper.loginUser(data.email, data.password)
      expect(regResponse.accessToken).toEqual(loginResponse.accessToken)

      const regUser = await service.getUserFromToken(regResponse.accessToken)
      const logUser = await service.getUserFromToken(loginResponse.accessToken)
      expect(regUser).toEqual(logUser)

      deleteUser(logUser.id)
    })
  })

  async function registerUser(data: RegisterInput) {
    return await wrapper.registerUser(data)
  }

  async function deleteUser(id: string) {
    const response = await wrapper.deleteUser(id)
    expect(response).toHaveProperty(['id'])
    expect(response.id).toEqual(id)
  }
})

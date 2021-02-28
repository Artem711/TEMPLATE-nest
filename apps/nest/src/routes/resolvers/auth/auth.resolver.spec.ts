import { Test, TestingModule } from '@nestjs/testing'
import { Providers } from '@server/config'
import { AuthResolver } from './auth.resolver'
import { AuthModuleConfig } from './auth.module'

const data = {
  email: 'z@gmail.com',
  firstName: 'Artem',
  lastName: 'Moshnin',
  password: '12345678',
}

describe('AuthResolver Test', () => {
  let wrapper: AuthResolver

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      ...AuthModuleConfig,
      imports: [...AuthModuleConfig.imports, Providers.ConfigProvider],
    }).compile()

    wrapper = app.get<AuthResolver>(AuthResolver)
  })

  async function registerUser() {
    return await wrapper.registerUser(data)
  }

  async function deleteUser(id: string) {
    const response = await wrapper.deleteUser(id)
    expect(response).toHaveProperty(['id'])
    expect(response.id).toEqual(id)
  }

  it('should register user succesfully', async () => {
    const response = await registerUser()
    expect(Object.keys(response)).toEqual(['accessToken', 'refreshToken', 'id'])

    deleteUser(response.id)
  })
})

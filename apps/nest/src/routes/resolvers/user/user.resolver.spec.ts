// # PLUGINS IMPORTS //
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

// # EXTRA IMPORTS //
import { AuthService } from '@server/routes/services'
import { UserResolver } from './user.resolver'
import { AuthResolver } from '../auth/auth.resolver'

import { Providers } from '@server/config'
import { UserModuleConfig } from './user.module'
import { AuthModuleConfig } from '../auth/auth.module'

import { TestsConstants, TestsFunctions } from '@server/../tests'
import { UserInputError } from 'apollo-server-express'

/////////////////////////////////////////////////////////////////////////////

describe('UserResolver Test', () => {
  let userResolver: UserResolver
  let authResolver: AuthResolver
  let id = undefined

  const data = TestsConstants.userDataGenerator()

  beforeEach(async () => {
    id && TestsFunctions.deleteUser(authResolver, id)
    await setup()
  })

  describe('getUser()', () => {
    it('should find and return `UserModule`', async () => {
      const response = await userResolver.getUser(id)
      expect(response).toHaveProperty('firstName')
    })

    it('should fail getUser, because wrong ID', async () => {
      const response = userResolver.getUser('blah')
      expect(response).resolves.toEqual(null)
    })
  })

  describe('updateUser()', () => {
    const newData = {
      firstName: 'SomeName',
      lastName: 'SomeLastName',
    }

    it('should update the user, then find succesfully verify if updated', async () => {
      await userResolver.updateUser({ ...data, id } as any, newData)

      const response = await userResolver.getUser(id)
      expect(response.firstName).toEqual(newData.firstName)
      expect(response.lastName).toEqual(newData.lastName)
    })

    it('should fail updateUser, because wrong ID', async () => {
      const response = userResolver.updateUser(
        { ...data, id: 'blah' } as any,
        newData
      )

      expect(response).rejects.toThrowError()
    })
  })

  async function setup() {
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

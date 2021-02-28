import { AuthResolver } from '@server/routes/resolvers/auth/auth.resolver'
import { RegisterInput } from '@server/routes/resolvers/auth/dto'

export async function registerUser(wrapper: AuthResolver, data: RegisterInput) {
  return await wrapper.registerUser(data)
}

export async function deleteUser(wrapper: AuthResolver, id: string) {
  return await wrapper.deleteUser(id)
}

import { PassportModule } from '@nestjs/passport'

export const PassportProvider = PassportModule.register({
  defaultStrategy: 'jwt',
})

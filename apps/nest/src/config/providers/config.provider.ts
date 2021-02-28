import { ConfigModule } from '@nestjs/config'
import { Constants } from '@server/config'

export const ConfigProvider = ConfigModule.forRoot({
  isGlobal: true,
  load: [Constants],
})

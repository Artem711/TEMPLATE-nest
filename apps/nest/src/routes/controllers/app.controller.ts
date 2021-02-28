// # PLUGINS IMPORTS //
import { Controller, Param, Get } from '@nestjs/common'

// # EXTRA IMPORTS //
import { AppService } from '@server/routes/services'

/////////////////////////////////////////////////////////////////////////////

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWord(@Param('text') text: string): string {
    return this.appService.getWord(text)
  }
}

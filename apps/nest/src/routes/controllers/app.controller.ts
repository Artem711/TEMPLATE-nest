// # PLUGINS IMPORTS //
import { Controller, Param, Get } from '@nestjs/common'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@Controller()
export class AppController {
  @Get()
  getWord(@Param('text') text: string): string {
    return text
  }
}

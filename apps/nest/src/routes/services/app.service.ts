// # PLUGINS IMPORTS //

import { Injectable } from '@nestjs/common'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AppService {
  getWord(text: string): string {
    return 'Some word' + text
  }
}

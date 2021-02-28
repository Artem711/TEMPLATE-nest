// # PLUGINS IMPORTS //
import { Resolver, Query, Args } from '@nestjs/graphql'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`
  }
}

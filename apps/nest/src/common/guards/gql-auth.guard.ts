// # PLUGINS IMPORTS //
import { Injectable, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

// # EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx.getContext().req.headers.authorization)

    return ctx.getContext().req
  }
}

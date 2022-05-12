import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common'

@Injectable()
export class ServersConnectGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['x-header-key']
    if (token !== process.env.X_HEADER) throw new BadRequestException('Invalid token')
    return true
  }
}

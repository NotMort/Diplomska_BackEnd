import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()])
    const request = context.switchToHttp().getRequest()

    if (isPublic) return true

    try {
      const access_token = request.cookies['access_token']
      if (!access_token) {
        throw new UnauthorizedException('No access token provided')
      }

      const decoded = this.jwtService.verify(access_token)
      return !!decoded
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        request.res.clearCookie('access_token')
        throw new UnauthorizedException('Session expired. Please log in again.')
      }
      throw new UnauthorizedException('Invalid token')
    }
  }
}

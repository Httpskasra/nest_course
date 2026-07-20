import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from 'src/generated/prisma/enums';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JWTPayload } from '../decorators/current-user.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as JWTPayload;

    if (!user) {
      throw new UnauthorizedException('اهراز هویت لازم است');
    }
    const hasRole = roles.includes(user.role as Role);

    if (!hasRole) {
      throw new ForbiddenException('acces denied');
    }

    return true;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAthGurd extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    _context: ExecutionContext,
  ): TUser {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException('token expire');
    }
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('invalid token');
    }

    if (err || !user) {
      throw new UnauthorizedException('اهراز هویت لازم است');
    }

    return user;
  }
}

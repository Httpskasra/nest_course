import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Role } from 'src/generated/prisma/enums';
export interface JWTPayload {
  sub: string;
  email: string;
  role: Role
}

export const CurrentUser = createParamDecorator(
  (
    data: keyof JWTPayload | undefined,
    ctx: ExecutionContextHost,
  ): JWTPayload | string => {
    const request = ctx.switchToHttp().getRequest();

    const user = request.user as JWTPayload;

    return data ? user[data] : user;
  },
);

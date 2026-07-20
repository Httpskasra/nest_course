
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../decorators/current-user.decorator';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {

    const secret=process.env.JWT_SECRET

    if(!secret){
        throw new Error("JWT_SECRET not set in env")
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JWTPayload) :Promise<JWTPayload>{

    if(!payload.sub  || !payload.email )
        throw new UnauthorizedException("توکن نامعتبر است")
    return {
    sub:payload.sub,
    email:payload.email,
    role:payload.role
    }
}

}

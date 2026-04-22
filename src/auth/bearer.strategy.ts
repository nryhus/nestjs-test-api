import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { JWTPayload } from './interface/auth.interface';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'Bearer') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'secret',
    });
  }

  async validate(payload: JWTPayload) {
    return this.authService.validateUser(payload);
  }
}

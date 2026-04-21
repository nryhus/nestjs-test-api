import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || 'secret',
    });
  }

  async validate(token: string) {
    let user: User | null = null;

    try {
      await this.jwtService.verifyAsync(token);
      const decodedToken = this.jwtService.decode(token);
      user = await this.authService.validateUser(decodedToken);
    } catch (e) {
      console.log(
        new Date().toISOString(),
        ' [JWT USER VERIFY ERROR] ',
        JSON.stringify(e),
        ' [TOKEN] ',
        token,
      );
      throw new UnauthorizedException();
    }

    return user;
  }
}

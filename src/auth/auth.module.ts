import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { BearerStrategy } from './bearer.strategy';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'Bearer',
      property: 'user',
      session: false,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => {
        const expiresIn = process.env.JWT_EXPIRES_IN ?? '24h';

        return {
          secret: process.env.JWT_SECRET_KEY || 'secret',
          signOptions: {
            expiresIn: expiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
          },
          verifyOptions: {
            clockTolerance: 60,
            maxAge: expiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
          },
        };
      },
    }),
  ],
  providers: [AuthService, BearerStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}

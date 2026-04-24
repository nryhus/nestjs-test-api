import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimalModule } from './animal/animal.module';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { TypeOrmConfiguration } from './config/database/type-orm-configuration';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UserModule,
    AnimalModule,
    AuthModule,
    PassportModule,
    CarModule,
  ],
})
export class AppModule {}

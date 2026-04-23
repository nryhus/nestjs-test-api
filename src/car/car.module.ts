import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [],
})
export class CarModule {}

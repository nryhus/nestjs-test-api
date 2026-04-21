import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [],
})
export class AnimalModule {}

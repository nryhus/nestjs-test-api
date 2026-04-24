import { PickType } from '@nestjs/swagger';

import { CarBaseRequestDto } from './car-base.request.dto';

export class CarCreateRequestDto extends PickType(CarBaseRequestDto, [
  'producer',
  'year',
  'model',
  'class',
]) {}

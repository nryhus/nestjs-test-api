import { PickType } from '@nestjs/swagger';

import { CarBaseRequestDto } from './car-base.request.dto';

export class CarUpdateRequestDto extends PickType(CarBaseRequestDto, [
  'year',
]) {}

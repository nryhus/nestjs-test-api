import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

import { CarClassEnum } from '../../enum/car-class.enum';

export class CarBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsInt()
  @Min(1990)
  @Max(2026)
  year: number;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsEnum(CarClassEnum)
  @IsNotEmpty()
  class: CarClassEnum;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;
}

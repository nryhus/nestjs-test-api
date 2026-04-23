import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class PublicUserInfoDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsEnum(['username', 'age'])
  sort: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  order: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  page: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  class: string;
}

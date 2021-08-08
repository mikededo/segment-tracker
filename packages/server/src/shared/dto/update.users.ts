import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator';

import { Gender, Level } from '@shared/enums';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(8, { message: 'Password min length is 8' })
  @MaxLength(24, { message: 'Password max length is 24' })
  readonly password: string;

  @IsOptional()
  readonly firstName: string;

  @IsOptional()
  readonly lastName: string;

  @IsOptional()
  readonly weight?: number;

  @IsOptional()
  readonly height?: number;

  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

  @IsOptional()
  @IsEnum(Level)
  readonly level?: Level;
}

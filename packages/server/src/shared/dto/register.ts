import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Gender, Level } from '../enums';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password min length is 8' })
  @MaxLength(24, { message: 'Password max length is 24' })
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
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

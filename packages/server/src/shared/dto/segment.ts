import { SegmentType } from '@shared/enums';
import { IsEnum, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class SegmentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly distance: number;

  @IsNotEmpty()
  readonly elevation: number;

  @IsOptional()
  @Min(0.0)
  @Max(100.0)
  readonly steep: number;

  @IsOptional()
  readonly stravaUrl: string;

  @IsOptional()
  @IsEnum(SegmentType)
  readonly type: SegmentType;
}

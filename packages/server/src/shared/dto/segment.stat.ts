import { IsOptional, Max, Min } from 'class-validator';

export class SegmentStatDto {
  @IsOptional()
  @Min(0)
  readonly duration: number;

  @IsOptional()
  @Min(0)
  readonly speed: number;

  @IsOptional()
  @Min(0)
  readonly cadence: number;

  @IsOptional()
  @Min(0)
  readonly bpm: number;

  @IsOptional()
  @Min(0)
  readonly power: number;

  @IsOptional()
  @Min(0)
  @Max(10)
  readonly feel: number;

  @IsOptional()
  readonly notes: string;

  @IsOptional()
  readonly date: Date;
}

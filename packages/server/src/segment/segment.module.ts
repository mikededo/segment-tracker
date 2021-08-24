import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';

import { SegmentController } from './segment.controller';
import { SegmentService } from './segment.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SegmentController],
  providers: [SegmentService],
  exports: [SegmentService],
})
export class SegmentModule {}

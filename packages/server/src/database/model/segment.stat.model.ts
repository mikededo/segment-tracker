import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';

import { Segment } from './segment.model';

export interface SegmentStat extends Document {
  readonly segment: Partial<Segment>;

  // duration is kept as milliseconds
  readonly duration: number;

  readonly speed: number;

  readonly cadence: number;

  readonly bpm: number;

  readonly power: number;

  readonly feel: number;

  readonly notes: string;

  readonly date: Date;
}

export type SegmentStatModel = Model<SegmentStat>;

export const SegmentStatSchema = new Schema<SegmentStat>({
  segment: { type: SchemaTypes.ObjectId, ref: 'Segment', required: true },
  duration: { type: SchemaTypes.Number, required: true },
  speed: { type: SchemaTypes.Number, required: true },
  cadence: { type: SchemaTypes.Number, required: false },
  bpm: { type: SchemaTypes.Number, required: false },
  power: { type: SchemaTypes.Number, required: false },
  feel: { type: SchemaTypes.Number, required: false },
  notes: { type: SchemaTypes.String, required: false },
  date: { type: SchemaTypes.Date, required: true },
});

export const createSegmentStatModel: (cnt: Connection) => SegmentStatModel = (
  cnt: Connection,
) => cnt.model<SegmentStat>('SegmentStat', SegmentStatSchema, 'segmentStats');

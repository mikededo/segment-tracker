import { SegmentType } from '@shared/enums';
import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { SegmentStatSchema } from './segment.stat.model';
import { User } from './user.model';

export interface Segment extends Document {
  readonly name: string;

  readonly distance: number;

  readonly elevation: number;

  readonly steep: number;

  readonly stravaUrl: string;

  readonly type: SegmentType;

  readonly owner: Partial<User>;
}

export type SegmentModel = Model<Segment>;

export const SegmentSchema = new Schema<Segment>(
  {
    name: { type: SchemaTypes.String, required: true },
    distance: { type: SchemaTypes.Number, required: true },
    elevation: { type: SchemaTypes.Number, required: true },
    steep: { type: SchemaTypes.Number, min: 0.0, max: 100.0 },
    stravaUrl: SchemaTypes.String,
    type: {
      type: SchemaTypes.String,
      enum: ['HILLY', 'FLAT', 'DOWNHILL'],
      default: 'FLAT',
    },
    owner: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export async function beforeSave(next: () => any) {
  if (this.steep) {
    return next();
  }

  // Auto-calculate the steep
  this.set('steep', (this.elevation / this.distance) * 0.1);
  next();
}

SegmentSchema.pre<Segment>(['save', 'updateOne'], beforeSave);

export async function afterDelete(segment: Segment, next: () => any) {
  // Simulate a cascade deletion
  await this.model('SegmentState').deleteMany({ segment: segment._id });
  next();
}

SegmentSchema.post<Segment>('deleteOne', afterDelete);

export const createSegmentModel: (cnt: Connection) => SegmentModel = (
  cnt: Connection,
) => cnt.model<Segment>('Segment', SegmentSchema, 'segments');

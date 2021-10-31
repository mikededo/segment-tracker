import { Gender, Level, SegmentType } from './enums';
import { SegmentForm } from './forms';

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  gender: Gender;
  level: Level;
}

export interface UserToken {
  ui: string;
  ue: string;
  iat: number;
  exp: number;
}

export interface Segment {
  _id: string;
  name: string;
  distance: number;
  elevation: number;
  steep: number;
  stravaUrl: string;
  type: SegmentType.DOWNHILL | SegmentType.FLAT | SegmentType.HILLY;
  owner: Pick<User, 'id'>;
}

export interface SegmentStat {
  segment?: Pick<Segment, '_id'>;
  duration: number;
  speed?: number;
  cadence?: number;
  bpm?: number;
  power?: number;
  feel?: number;
  date: Date;
}

export class Parsers {
  static segmentFormToSegment(data: SegmentForm): Segment {
    return {
      ...data,
      distance: parseFloat(data.distance),
      elevation: parseInt(data.elevation, 10),
    } as any;
  }
}

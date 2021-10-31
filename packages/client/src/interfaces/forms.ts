import { SegmentType } from './enums';

export type LoginForm = {
  email: string;
  password: string;
};

export type SegmentForm = {
  name: string;
  distance: string;
  elevation: string;
  type: SegmentType;
  stravaUrl: string;
};

export type SegmentStatForm = {
  duration: string;
  speed: string;
  cadence: string;
  bpm: string;
  power: string;
  feel: number;
  notes: string;
  date: Date;
};

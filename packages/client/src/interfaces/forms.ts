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

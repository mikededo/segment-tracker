import { compare, hash } from 'bcrypt';
import { Connection, Document, Model, Schema, SchemaTypes } from 'mongoose';
import { from, Observable } from 'rxjs';

import { Gender, Level } from '@shared/enums';
import { baseSerializer } from '@shared/helpers';

export interface User extends Document {
  readonly email: string;

  readonly password: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly weight: number;

  readonly height: number;

  readonly gender: Gender;

  readonly level: Level;

  comparePassword(password: string): Observable<boolean>;
}

export type UserModel = Model<User>;

export const UserSchema = new Schema<User>(
  {
    email: { type: SchemaTypes.String, immutable: true },
    password: { type: SchemaTypes.String },
    firstName: SchemaTypes.String,
    lastName: { type: SchemaTypes.String, required: false },
    weight: { type: SchemaTypes.Number, default: 80.0 },
    height: { type: SchemaTypes.Number, default: 170.0 },
    gender: {
      type: SchemaTypes.String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      default: 'OTHER'
    },
    level: {
      type: SchemaTypes.String,
      enum: ['BEGGINER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
      default: 'INTERMEDIATE'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: baseSerializer },
    versionKey: false
  }
);

export async function beforeSave(next: () => any) {
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password otherwise
  const password = await hash(this.password, 12);
  this.set('password', password);

  next();
}

// Add the hook before the user is saved
UserSchema.pre<User>('save', beforeSave);
// And before the user is updated
UserSchema.pre<User>('updateOne', beforeSave);

export function comparePassword(password: string): Observable<boolean> {
  return from(compare(password, this.password));
}

// Add the function that checks the hashed password
UserSchema.methods.comparePassword = comparePassword;

export function userNameHook() {
  return `${this.firstName} ${this.lastName}`;
}

// Add virtual attribute to get the user full name
UserSchema.virtual('name').get(userNameHook);

export const createUserModel: (cnt: Connection) => UserModel = (
  cnt: Connection
) => cnt.model<User>('User', UserSchema, 'users');

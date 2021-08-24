import * as mongoose from 'mongoose';

import { BadRequestException } from '@nestjs/common';
import { ParseObjectIdPipe } from '@shared/pipes';

describe('ParseObjectIdPipe', () => {
  let isObjectId: ParseObjectIdPipe;

  beforeEach(() => {
    isObjectId = new ParseObjectIdPipe();
  });

  it('should be defined', () => {
    expect(isObjectId).toBeDefined();
  });

  it('should equal a valid id', () => {
    const validId = new mongoose.Types.ObjectId().toHexString();
    const result = isObjectId.transform(validId, undefined);

    expect(result).toEqual(validId);
  });

  it('should throw BadRequestException on invalid id', () => {
    try {
      isObjectId.transform('not_valid', undefined);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe(`not_valid is not a valid id`);
    }
  });
});

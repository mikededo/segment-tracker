import * as mongoose from 'mongoose';

import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform
} from '@nestjs/common';
import {
  ErrorHttpStatusCode,
  HttpErrorByCode
} from '@nestjs/common/utils/http-error-by-code.util';

// By addind options (as in ParseInPipe), we can change
// the error code if wanted
export interface ParseObjectIdPipeOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
}

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
  private exceptionFactory: (error: string) => any;

  constructor(@Optional() options?: ParseObjectIdPipeOptions) {
    this.exceptionFactory = (error) =>
      new HttpErrorByCode[
        options?.errorHttpStatusCode ?? HttpStatus.BAD_REQUEST
      ](error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(value)) {
      throw this.exceptionFactory(`${value} is not a valid id`);
    }

    return value;
  }
}

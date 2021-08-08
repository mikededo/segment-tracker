import { map, Observable } from 'rxjs';

import { User } from '@database/model/user.model';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext,
    next: CallHandler<User>,
  ): Observable<User> {
    return next.handle().pipe(
      map((user) => {
        // toJSON converts the document to a JSON and then the
        // password can be removed so it is not passed in the response
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...res } = user.toJSON();
        return res as User;
      }),
    );
  }
}

import { Response } from 'express';
import { map, mergeMap, Observable } from 'rxjs';

import {
  Body,
  ConflictException,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterDto } from '@shared/dto';
import { UserService } from '@user/user.service';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  register(
    @Body() body: RegisterDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.userService.existingEmail(body.email).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException(`Existing email: ${body.email}`);
        }

        return this.userService.register(body).pipe(
          map((created) => {
            return res
              .location(`/users/${created.id}`)
              .status(HttpStatus.CREATED)
              .send(created);
          }),
        );
      }),
    );
  }
}

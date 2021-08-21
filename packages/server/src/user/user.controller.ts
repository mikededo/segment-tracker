import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { JwtGuard } from '@auth/guard/jwt.guard';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '@shared/dto/update.users';
import { ParseObjectIdPipe } from '@shared/pipes';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  getUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Res() res: Response,
  ): Observable<Response> {
    return this.service
      .findById(id)
      .pipe(map((found) => res.status(HttpStatus.OK).send(found)));
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  updateUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() user: UpdateUserDto,
    @Res() res: Response,
  ): Observable<Response> {
    return this.service.update(id, user).pipe(
      map((updated) => {
        return res.status(HttpStatus.ACCEPTED).send(updated);
      }),
    );
  }
}

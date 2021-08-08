import { Observable } from 'rxjs';

import { JwtGuard } from '@auth/guard/jwt.guard';
import { User } from '@database/model/user.model';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from '@shared/dto/update.users';
import { ExcludePasswordInterceptor } from '@shared/interceptors/exclude.password.interceptor';
import { ParseObjectIdPipe } from '@shared/pipes';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  getUser(@Param('id', new ParseObjectIdPipe()) id: string): Observable<User> {
    return this.service.findById(id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(ExcludePasswordInterceptor)
  @Put(':id')
  updateUser(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() user: UpdateUserDto,
  ): Observable<User> {
    return this.service.update(id, user);
  }
}

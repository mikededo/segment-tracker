import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '@shared/interfaces';

import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  login(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): Observable<Response> {
    return this.authService
      .login(req.user)
      .pipe(
        map(({ token }) =>
          res.header('Authorization', `Bearer ${token}`).json(token).send()
        )
      );
  }
}

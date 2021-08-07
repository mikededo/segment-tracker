import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '@shared/interfaces';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  login(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Observable<Response> {
    console.log(req);
    return this.authService
      .login(req.user)
      .pipe(
        map(({ token }) =>
          res.header('Authorization', `Bearer ${token}`).json().send(),
        ),
      );
  }
}

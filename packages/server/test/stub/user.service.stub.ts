import mongoose from 'mongoose';
import { EMPTY, from, map, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';

import { User } from '@database/model/user.model';
import { NotFoundException } from '@nestjs/common';
import { RegisterDto } from '@shared/dto/register';
import { UpdateUserDto } from '@shared/dto/update.users';
import { UserService } from '@user/user.service';

export class UserServiceStub implements Pick<UserService, keyof UserService> {
  private users: User[] = [
    {
      _id: '61100878bda459155a1f5198',
      firstName: 'Stub',
      lastName: 'User I',
      email: 'stub.i@user.com'
    } as User,
    {
      _id: '611008cadf1580788fde65a0',
      firstName: 'Stub',
      lastName: 'User II',
      email: 'stub.ii@user.com'
    } as User,
    {
      _id: '611008d88f015748ef02cdea',
      firstName: 'Stub',
      lastName: 'User III',
      email: 'stub.iii@user.com'
    } as User
  ];

  findByEmail(email: string): Observable<User> {
    return of(this.users.find((user) => user.email === email));
  }

  findById(_id: string): Observable<User> {
    return of(this.users.find((user) => user._id === _id));
  }

  existingEmail(email: string): Observable<boolean> {
    return of(this.users.find((user) => user.email === email) !== undefined);
  }

  register(data: RegisterDto): Observable<User> {
    return of({
      _id: new mongoose.Types.ObjectId().toHexString(),
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    } as User);
  }

  update(id: string, data: UpdateUserDto): Observable<User> {
    return from(
      this.findById(id).pipe(
        mergeMap((u) => (u ? of(u) : EMPTY)),
        throwIfEmpty(() => new NotFoundException(`user:${id} not found`)),
        map((user) => ({ ...user, ...data } as User))
      )
    );
  }
}

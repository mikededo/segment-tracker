import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';

import { User, UserModel } from '@models/user.model';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PROVIDERS } from '@shared/constants';
import { RegisterDto } from '@dto/register';
import { UpdateUserDto } from '@shared/dto/update.users';

@Injectable()
export class UserService {
  constructor(@Inject(PROVIDERS.MODELS.USER) private model: UserModel) {}

  /**
   * Finds a user given it's email
   * @param email The email of the user to find
   * @returns An observable with the found user if any
   */
  findByEmail(email: string): Observable<User> {
    return from(this.model.findOne({ email }).exec());
  }

  /**
   * Fins a user given it's id
   * @param _id The if of the user to find
   * @returns An observable with the found user if any
   */
  findById(_id: string): Observable<User> {
    return from(this.model.findById(_id).exec());
  }

  /**
   * Checks if there's any user with the given email
   * @param email The email of the user to check
   * @returns True if there's any user with the given email,
   * false otherwise
   */
  existingEmail(email: string): Observable<boolean> {
    return from(this.model.exists({ email }));
  }

  /**
   * Registers a user with the data. If some data is not provided
   * uses the default values
   * @param data New user data
   * @returns An observable to the registered user
   */
  register(data: RegisterDto): Observable<User> {
    return from(this.model.create({ ...data }));
  }

  /**
   * Updates the valued given in `data` if the there's a user with
   * `id` in the database
   * @param id The id of the user to update
   * @param data The data to update
   * @returns An observable to a user with the updated values
   */
  update(id: string, data: UpdateUserDto): Observable<User> {
    return this.findById(id)
      .pipe(
        mergeMap((u) => (u ? of(u) : EMPTY)),
        throwIfEmpty(() => new NotFoundException(`user:${id} not found`)),
      )
      .pipe(mergeMap((u) => from(Object.assign(u, data).save())));
  }
}

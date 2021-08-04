import { Connection } from 'mongoose';

import { PROVIDERS } from '../shared/constants';
import { createUserModel } from './model/user.model';

export const dbModelsProviders = [
  {
    provide: PROVIDERS.MODELS.USER,
    useFactory: (cnt: Connection) => createUserModel(cnt),
    inject: [PROVIDERS.DB],
  },
];

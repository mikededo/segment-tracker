import { Connection } from 'mongoose';

import { PROVIDERS } from '@shared/constants';

import { createSegmentModel } from './model/segment.model';
import { createSegmentStatModel } from './model/segment.stat.model';
import { createUserModel } from './model/user.model';

export const dbModelsProviders = [
  {
    provide: PROVIDERS.MODELS.USER,
    useFactory: (cnt: Connection) => createUserModel(cnt),
    inject: [PROVIDERS.DB],
  },
  {
    provide: PROVIDERS.MODELS.SEGMENT,
    useFactory: (cnt: Connection) => createSegmentModel(cnt),
    inject: [PROVIDERS.DB],
  },
  {
    provide: PROVIDERS.MODELS.SEGMENT_STAT,
    useFactory: (cnt: Connection) => createSegmentStatModel(cnt),
    inject: [PROVIDERS.DB],
  },
];

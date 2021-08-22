import { Connection, Model } from 'mongoose';

import { dbModelsProviders } from '@database/db-models.providers';
import { User } from '@models/user.model';
import { Test, TestingModule } from '@nestjs/testing';
import { PROVIDERS } from '@shared/constants';
import { Segment } from '@database/model/segment.model';
import { SegmentStat } from '@database/model/segment.stat.model';

describe('dbModelsProviders', () => {
  let connection: Connection;
  let userModel: Model<User>;
  let segmentModel: Model<Segment>;
  let segmentStatModel: Model<SegmentStat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ...dbModelsProviders,
        {
          provide: PROVIDERS.DB,
          useValue: {
            model: jest
              .fn()
              .mockReturnValue({} as Model<User | Segment | SegmentStat>),
          },
        },
      ],
    }).compile();

    connection = module.get<Connection>(PROVIDERS.DB);
    userModel = module.get<Model<User>>(PROVIDERS.MODELS.USER);
    segmentModel = module.get<Model<Segment>>(PROVIDERS.MODELS.SEGMENT);
    segmentStatModel = module.get<Model<SegmentStat>>(
      PROVIDERS.MODELS.SEGMENT_STAT,
    );
  });

  it(`${PROVIDERS.DB} should be defined`, () => {
    expect(connection).toBeDefined();
  });

  it(`${PROVIDERS.MODELS.USER} should be defined`, () => {
    expect(userModel).toBeDefined();
  });

  it(`${PROVIDERS.MODELS.SEGMENT} should be defined`, () => {
    expect(segmentModel).toBeDefined();
  });

  it(`${PROVIDERS.MODELS.SEGMENT_STAT} should be defined`, () => {
    expect(segmentStatModel).toBeDefined();
  });
});

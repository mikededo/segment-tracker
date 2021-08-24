import { Model } from 'mongoose';
import { lastValueFrom, of } from 'rxjs';

import { Segment } from '@database/model/segment.model';
import { SegmentStat } from '@database/model/segment.stat.model';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { FindAllSegmentsQuery } from '@segment/segment.interfaces';
import { SegmentService } from '@segment/segment.service';
import { PROVIDERS } from '@shared/constants';
import { UserFromClaims } from '@shared/interfaces';

describe('SegmentService', () => {
  let service: SegmentService;
  let segmentModel: Model<Segment>;
  let segmentStatModel: Model<SegmentStat>;

  const segments = [
    {
      _id: '6121f0bb8ffd2b6fcd1c7376',
      name: 'Mock Segment I',
      distance: 10.0,
      elevation: 450,
      owner: { _id: 'mock.id' },
    },
    {
      _id: '6121f0bb8ffd2b6fcd1c7377',
      name: 'Mock Segment II',
      distance: 8.0,
      elevation: 750,
      owner: { _id: 'mock.id' },
    },
    {
      _id: '6121f0bb8ffd2b6fcd1c7378',
      name: 'Mock Segment III',
      distance: 15.0,
      elevation: 0,
      owner: { _id: 'mock.id' },
    },
  ];

  const onNotFound = (error: any) => {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NotFoundException);
    expect(error.message).toBe('segment: not found');
  };

  const onForbidden = (error: any) => {
    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(ForbiddenException);
    expect(error.message).toBe('user does not own this segment');
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SegmentService,
        {
          provide: PROVIDERS.MODELS.SEGMENT,
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            deleteMany: jest.fn(),
            deleteOne: jest.fn(),
            updateOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: PROVIDERS.MODELS.SEGMENT_STAT,
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            deleteMany: jest.fn(),
            deleteOne: jest.fn(),
            updateOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: REQUEST,
          useValue: {
            user: {
              id: 'mock.id',
              email: 'mock@email.com',
            } as UserFromClaims,
          },
        },
      ],
    }).compile();

    service = await module.resolve<SegmentService>(SegmentService);
    segmentModel = module.get<Model<Segment>>(PROVIDERS.MODELS.SEGMENT);
    segmentStatModel = module.get<Model<SegmentStat>>(
      PROVIDERS.MODELS.SEGMENT_STAT,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFilters', () => {
    it('should return empty object on no filters', () => {
      const result = service.getFilters();

      expect(result).toBeDefined();
      expect(result).toStrictEqual({});
    });

    it('should return empty object on empty object as filters', () => {
      const result = service.getFilters({});

      expect(result).toBeDefined();
      expect(result).toStrictEqual({});
    });

    it('should return the applied filters', () => {
      const filters: Partial<FindAllSegmentsQuery> = {
        keyword: 'test',
        maxDistance: 15,
        minDistance: 2,
        maxElevation: 500,
        minElevation: 0,
        maxSteep: 10.0,
        minSteep: 2.5,
        type: 'HILLY',
      };

      expect(service.getFilters(filters)).toStrictEqual({
        name: { $regex: `.*test*.` },
        distance: { $geq: filters.minDistance, $leq: filters.maxDistance },
        elevation: { $geq: filters.minElevation, $leq: filters.maxElevation },
        steep: { $geq: filters.minSteep, $leq: filters.maxSteep },
        type: { $eq: 'HILLY' },
      });
    });
  });

  describe('findAll', () => {
    const mockFindReturnValue = (returnValue: any[]) =>
      ({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValueOnce(returnValue) as any,
          }),
        }),
      } as any);

    it('should return all segments', async () => {
      const getFiltersSpy = jest.spyOn(service, 'getFilters');

      jest
        .spyOn(segmentModel, 'find')
        .mockReturnValue(mockFindReturnValue(segments));

      const result = await lastValueFrom(service.findAll());

      expect(getFiltersSpy).toHaveBeenCalledWith({});
      expect(result.length).toBe(3);
      expect(segmentModel.find).toHaveBeenCalledWith({
        owner: { _id: 'mock.id' },
      });
    });

    it('should return segments with geq 200 elevation', async () => {
      const getFiltersSpy = jest.spyOn(service, 'getFilters');
      const findAllOpts = {
        minElevation: 200,
      } as FindAllSegmentsQuery;

      jest
        .spyOn(segmentModel, 'find')
        .mockReturnValue(
          mockFindReturnValue(
            segments.filter((segment) => segment.elevation >= 200),
          ),
        );

      await lastValueFrom(service.findAll(findAllOpts));

      expect(getFiltersSpy).toHaveBeenCalled();
      expect(getFiltersSpy).toHaveBeenCalledWith({
        ...findAllOpts,
      });

      expect(segmentModel.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return the post with the given id', (done) => {
      const found = segments[0];

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(found) as any,
      } as any);

      service.findById('6121f0bb8ffd2b6fcd1c7376').subscribe({
        next: (data) => {
          expect(data._id).toBe('6121f0bb8ffd2b6fcd1c7376');
          expect(data.name).toBe(found.name);
          expect(segmentModel.findById).toBeCalledWith(
            '6121f0bb8ffd2b6fcd1c7376',
          );
        },
        complete: done(),
      });
    });

    it('should throw a NotFoundException if not found', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(null) as any,
      } as any);

      expect.assertions(3);

      service.findById('').subscribe({
        error: onNotFound,
        complete: done(),
      });
    });

    it('should throw ForbiddenException if user does not own the segment', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...segments[0],
          owner: { _id: 'invalid.id' },
        } as any),
      } as any);

      expect.assertions(3);

      service.findById('6121f0bb8ffd2b6fcd1c7376').subscribe({
        error: onForbidden,
        complete: done(),
      });
    });
  });

  describe('save', () => {
    it('should create a new segment', async () => {
      const segment = {
        name: 'New segment',
        distance: 5.0,
        elevation: 500,
      } as any;

      const saved = {
        _id: '6121f0bb8ffd2b6fcd1c7375',
        steep: 10.0,
        ...segment,
      } as Segment;

      jest
        .spyOn(segmentModel, 'create')
        .mockImplementation(() => Promise.resolve(saved));

      const result = await lastValueFrom(service.save(segment));
      expect(result).toBeDefined();
      expect(result._id).toBe('6121f0bb8ffd2b6fcd1c7375');
      expect(segmentModel.create).toBeCalledWith({
        ...segment,
        owner: { _id: 'mock.id' },
      });
      expect(segmentModel.create).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing segment', (done) => {
      const segment = {
        _id: '6121f0bb8ffd2b6fcd1c7375',
        name: 'Updated segment',
        distance: 5.0,
        elevation: 500,
        owner: { _id: 'mock.id' },
      } as any;

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          _id: '6121f0bb8ffd2b6fcd1c7375',
          name: 'Non updated segment',
          distance: 5.0,
          elevation: 500,
          owner: { _id: 'mock.id' },
          save: jest.fn().mockReturnValue(of(segment)),
        } as any),
      } as any);

      service.update('6121f0bb8ffd2b6fcd1c7375', segment).subscribe({
        next: (data) => {
          expect(data).toBeDefined();
          expect(data.name).toBe('Updated segment');

          expect(segmentModel.findById).toHaveBeenCalled();
          expect(segmentModel.findById).toHaveBeenCalledWith(
            '6121f0bb8ffd2b6fcd1c7375',
          );
        },
        complete: done(),
      });
    });

    it('should throw a NotFoundException if the segment does not exists', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null) as any,
      } as any);

      expect.assertions(3);

      service
        .update('', {} as any)
        .subscribe({ error: onNotFound, complete: done() });
    });

    it('should throw ForbiddenException if user does not own the segment', (done) => {
      const segment = {
        _id: '6121f0bb8ffd2b6fcd1c7375',
        name: 'Updated segment',
        distance: 5.0,
        elevation: 500,
        owner: { _id: 'mock.id' },
      } as any;

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...segments[0],
          owner: { _id: 'invalid.id' },
        } as any),
      } as any);

      expect.assertions(3);

      service.update('6121f0bb8ffd2b6fcd1c7376', segment).subscribe({
        error: onForbidden,
        complete: done(),
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing segment and its stats', (done) => {
      const segment = {
        _id: '6121f0bb8ffd2b6fcd1c7375',
        name: 'Updated segment',
        distance: 5.0,
        elevation: 500,
        owner: { _id: 'mock.id' },
      } as any;

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...segment,
          delete: jest.fn().mockResolvedValue(of(segment)),
        }),
      } as any);

      service.delete('6121f0bb8ffd2b6fcd1c7375').subscribe({
        next: (data) => {
          expect(data).toBeDefined();
          expect(data._id).toBe('6121f0bb8ffd2b6fcd1c7375');

          expect(segmentModel.findById).toHaveBeenCalled();
          expect(segmentModel.findById).toHaveBeenCalledWith(
            '6121f0bb8ffd2b6fcd1c7375',
          );
        },
        complete: done(),
      });
    });

    it('should throw a NotFoundException if the segment does not exist', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null) as any,
      } as any);

      expect.assertions(3);

      service.delete('').subscribe({
        error: onNotFound,
        complete: done(),
      });
    });

    it('should throw ForbiddenException if user does not own the segment', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...segments[0],
          owner: { _id: 'invalid.id' },
        } as any),
      } as any);

      expect.assertions(3);

      service.delete('6121f0bb8ffd2b6fcd1c7376').subscribe({
        error: onForbidden,
        complete: done(),
      });
    });
  });

  describe('createStatFor', () => {
    it('should create a comment for an existing segment', async () => {
      const stat = { date: new Date(), duration: 1000 } as any;

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          _id: 'segment.mock.id',
          owner: { _id: 'mock.id' },
        } as any),
      } as any);

      jest.spyOn(segmentStatModel, 'create').mockImplementation(() =>
        Promise.resolve({
          ...stat,
          segment: { _id: 'segment.mock.id' },
        } as any),
      );

      const result = await lastValueFrom(
        service.createStatFor('segment.mock.id', stat),
      );

      expect(result.duration).toBe(1000);
      expect(segmentStatModel.create).toBeCalledWith({
        ...stat,
        segment: { _id: 'segment.mock.id' },
      });
    });

    it('should throw a NotFoundException if the segment does not exists', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null) as any,
      } as any);

      expect.assertions(3);

      service
        .createStatFor('', {} as any)
        .subscribe({ error: onNotFound, complete: done() });
    });

    it('should throw ForbiddenException if user does not own the segment', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...segments[0],
          owner: { _id: 'invalid.id' },
        } as any),
      } as any);

      expect.assertions(3);

      service.createStatFor('6121f0bb8ffd2b6fcd1c7376', {} as any).subscribe({
        error: onForbidden,
        complete: done(),
      });
    });
  });

  describe('getStatsFrom', () => {
    it('should return all stats of a segment', async () => {
      const stats = [
        {
          date: new Date(),
          duration: 1000,
          segment: { _id: 'segment.mock.id' },
        } as any,
        {
          date: new Date(),
          duration: 1000,
          segment: { _id: 'segment.mock.id' },
        } as any,
        {
          date: new Date(),
          duration: 1000,
          segment: { _id: 'segment.mock.id' },
        } as any,
      ];

      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          _id: 'segment.mock.id',
          owner: { _id: 'mock.id' },
        } as any),
      } as any);

      jest.spyOn(segmentStatModel, 'find').mockImplementation(
        () =>
          ({
            exec: jest.fn().mockReturnValueOnce(Promise.resolve([...stats])),
          } as any),
      );

      const result = await lastValueFrom(
        service.getStatsFrom('segment.mock.id'),
      );

      expect(result.length).toBe(3);
      expect(segmentStatModel.find).toBeCalledWith({
        segment: { _id: 'segment.mock.id' },
      });
    });

    it('should throw a NotFoundException if the segment does not exists', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null) as any,
      } as any);

      expect.assertions(3);

      service
        .getStatsFrom('')
        .subscribe({ error: onNotFound, complete: done() });
    });

    it('should throw ForbiddenException if user does not own the segment', (done) => {
      jest.spyOn(segmentModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce({
          ...segments[0],
          owner: { _id: 'invalid.id' },
        } as any),
      } as any);

      expect.assertions(3);

      service.getStatsFrom('6121f0bb8ffd2b6fcd1c7376').subscribe({
        error: onForbidden,
        complete: done(),
      });
    });
  });
});

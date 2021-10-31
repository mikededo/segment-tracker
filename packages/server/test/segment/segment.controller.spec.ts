import { Response } from 'express';
import { lastValueFrom } from 'rxjs';

import { Segment } from '@database/model/segment.model';
import { createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SegmentController } from '@segment/segment.controller';
import { SegmentService } from '@segment/segment.service';
import { SegmentDto } from '@shared/dto/segment';

import { SegmentServiceStub } from '../stub/segment.service.stub';
import { SegmentStat } from '@database/model/segment.stat.model';
import { SegmentStatDto } from '@shared/dto/segment.stat';

describe('SegmentController', () => {
  let controller: SegmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentController],
      providers: [
        {
          provide: SegmentService,
          useClass: SegmentServiceStub
        }
      ]
    }).compile();

    controller = await module.resolve<SegmentController>(SegmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all segments of a user', async () => {
      const result = await lastValueFrom(controller.getAll());

      expect(result.length).toBe(4);
    });
  });

  describe('getSingle', () => {
    it('should return the segment with the given id', async () => {
      const result = await lastValueFrom(
        controller.getSingle('6121f0bb8ffd2b6fcd1c7379')
      );

      expect(result).toStrictEqual({
        _id: '6121f0bb8ffd2b6fcd1c7379',
        name: 'Stub Segment IV',
        distance: 5.0,
        elevation: 500,
        steep: 10.0
      } as Segment);
    });
  });

  describe('createSegment', () => {
    it('should add a new segment', async () => {
      const segment = {
        name: 'New segment',
        distance: 5.0,
        elevation: 100
      } as SegmentDto;

      const result = await lastValueFrom(
        controller.createSegment(
          segment,
          createMock<Response>({
            location: jest.fn().mockReturnValue({
              status: jest.fn().mockReturnValue({
                send: jest.fn().mockReturnValue({
                  headers: { location: '/posts/id' },
                  status: HttpStatus.CREATED
                })
              })
            })
          })
        )
      );

      expect(result.status).toBe(HttpStatus.CREATED);
    });
  });

  describe('updateSegment', () => {
    it('should update an existing segment', (done) => {
      const segment = {
        name: 'Updated segment',
        elevation: 550,
        distance: 12.5
      } as SegmentDto;

      controller
        .updateSegment(
          '6121f0bb8ffd2b6fcd1c7376',
          segment,
          createMock<Response>({
            status: jest.fn().mockReturnValue({
              send: jest.fn().mockReturnValue({
                status: HttpStatus.NO_CONTENT
              })
            })
          })
        )
        .subscribe({
          next: (data) => {
            expect(data.status).toBe(HttpStatus.NO_CONTENT);
          },
          complete: done()
        });
    });
  });

  describe('deleteSegment', () => {
    it('should delete an existing segment', (done) => {
      controller
        .deleteSegment(
          '6121f0bb8ffd2b6fcd1c7376',
          createMock<Response>({
            status: jest.fn().mockReturnValue({
              send: jest.fn().mockReturnValue({
                status: HttpStatus.NO_CONTENT
              })
            })
          })
        )
        .subscribe({
          next: (data: any) => {
            expect(data).toBeDefined();
          },
          complete: done()
        });
    });
  });

  describe('createStat', () => {
    it('should add a SegmentStat to an existing segment', (done) => {
      const stat = {
        duration: 1506,
        bpm: 140,
        cadence: 65,
        date: new Date()
      } as SegmentStatDto;

      controller
        .createStat(
          '6121f0bb8ffd2b6fcd1c7376',
          stat,
          createMock<Response>({
            location: jest.fn().mockReturnValue({
              status: jest.fn().mockReturnValue({
                send: jest.fn().mockReturnValue({
                  status: HttpStatus.CREATED
                })
              })
            })
          })
        )
        .subscribe({
          next: (data) => {
            expect(data).toBeDefined();
            expect(data.status).toBe(HttpStatus.CREATED);
          },
          complete: done()
        });
    });
  });

  describe('getSegmentStats', () => {
    it('should return all the SegmentStats from a segment', (done) => {
      controller
        .getStatsFrom(
          '6121f0bb8ffd2b6fcd1c7376',
          createMock<Response>({
            status: jest.fn().mockReturnValue({
              send: jest.fn().mockReturnValue({
                status: HttpStatus.OK
              })
            })
          })
        )
        .subscribe({
          next: (data) => {
            expect(data).toBeDefined();
            expect(data.status).toBe(HttpStatus.OK);
          },
          complete: done()
        });
    });
  });
});

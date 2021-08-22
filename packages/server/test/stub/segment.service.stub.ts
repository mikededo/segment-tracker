import { Types } from 'mongoose';
import { Observable, of } from 'rxjs';

import { Segment } from '@database/model/segment.model';
import { SegmentStat } from '@database/model/segment.stat.model';
import { FindAllSegmentsQuery } from '@segment/segment.interfaces';
import { SegmentService } from '@segment/segment.service';
import { SegmentDto } from '@shared/dto/segment';

export class SegmentServiceStub
  implements Pick<SegmentService, keyof SegmentService>
{
  private segments: Segment[] = [
    {
      _id: '6121f0bb8ffd2b6fcd1c7376',
      name: 'Stub Segment I',
      distance: 5.0,
      elevation: 500,
      steep: 10.0,
    } as Segment,
    {
      _id: '6121f0bb8ffd2b6fcd1c7377',
      name: 'Stub Segment II',
      distance: 5.0,
      elevation: 500,
      steep: 10.0,
    } as Segment,
    {
      _id: '6121f0bb8ffd2b6fcd1c7378',
      name: 'Stub Segment III',
      distance: 5.0,
      elevation: 500,
      steep: 10.0,
    } as Segment,
    {
      _id: '6121f0bb8ffd2b6fcd1c7379',
      name: 'Stub Segment IV',
      distance: 5.0,
      elevation: 500,
      steep: 10.0,
    } as Segment,
  ];

  private segmentStats: SegmentStat[] = [
    {
      duration: 10000,
      segment: { _id: '6121f0bb8ffd2b6fcd1c7396' },
      date: new Date(2021, 6, 1),
    } as SegmentStat,
    {
      duration: 9500,
      segment: { _id: '6121f0bb8ffd2b6fcd1c7397' },
      date: new Date(2021, 6, 3),
    } as SegmentStat,
    {
      duration: 9750,
      segment: { _id: '6121f0bb8ffd2b6fcd1c7398' },
      date: new Date(2021, 6, 5),
    } as SegmentStat,
  ];

  getFilters(filters: Partial<FindAllSegmentsQuery> = null): any {
    if (!filters || Object.keys(filters).length === 0) {
      return {};
    }

    const result = {
      name: { $regex: `.*${filters.keyword ?? ''}*.` },
      distance: { $geq: filters.minDistance ?? 0.0 },
      elevation: { $geq: filters.minElevation ?? 0.0 },
      steep: { $geq: filters.minSteep ?? 0.0 },
    } as any;

    if (filters.maxDistance) {
      result.distance = { ...result.distance, $leq: filters.maxDistance };
    }

    if (filters.maxElevation) {
      result.elevation = { ...result.elevation, $leq: filters.maxElevation };
    }

    if (filters.maxSteep) {
      result.steep = { ...result.steep, $leq: filters.maxSteep };
    }

    if (filters.type) {
      result.type = { $eq: filters.type };
    }

    return result;
  }

  findAll(): Observable<Segment[]> {
    return of(this.segments);
  }

  findById(id: string): Observable<Segment> {
    return of(this.segments.find((segment) => segment._id === id));
  }

  save(segment: SegmentDto): Observable<Segment> {
    return of({
      _id: new Types.ObjectId().toHexString(),
      ...segment,
    } as Segment);
  }

  update(id: string, data: SegmentDto): Observable<Segment> {
    return of({ _id: id, ...data } as Segment);
  }

  delete(id: string): Observable<Segment> {
    return of(this.segments.find((segment) => segment._id === id));
  }
}

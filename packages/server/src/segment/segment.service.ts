import { Model } from 'mongoose';
import { EMPTY, from, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';

import { Segment } from '@database/model/segment.model';
import { SegmentStat } from '@database/model/segment.stat.model';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { PROVIDERS } from '@shared/constants';
import { AuthenticatedRequest } from '@shared/interfaces';

import { FindAllSegmentsQuery } from './segment.interfaces';
import { SegmentDto } from '@shared/dto/segment';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class SegmentService {
  constructor(
    @Inject(PROVIDERS.MODELS.SEGMENT) private segmentModel: Model<Segment>,
    @Inject(PROVIDERS.MODELS.SEGMENT_STAT)
    private segmentStatModel: Model<SegmentStat>,
    @Inject(REQUEST) private request: AuthenticatedRequest,
  ) {}

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

  private checkOwnage(segment: Segment): Observable<Segment> {
    if (!segment) {
      return EMPTY;
    }

    if (segment.owner._id != this.request.user.id) {
      throw new ForbiddenException(`user does not own this segment`);
    }

    return of(segment);
  }

  /**
   * Searches for all segments which match the given filters
   * without the `SegmentStat`'s of each
   *
   * @returns An observable to the found segments
   */
  findAll({
    limit = 20,
    skip = 0,
    ...filters
  }: FindAllSegmentsQuery = {}): Observable<Segment[]> {
    return from(
      this.segmentModel
        .find({
          owner: { _id: this.request.user.id },
          ...this.getFilters(filters),
        })
        .skip(skip)
        .limit(limit)
        .exec(),
    );
  }

  /**
   * Searches for a segment with the given id
   *
   * @param id The id of the segment to be found
   * @returns An observable to the found segment
   * @throws {NotFoundException} If the id does not belong
   * to any segment
   */
  findById(id: string): Observable<Segment> {
    return from(this.segmentModel.findById(id).exec()).pipe(
      mergeMap((s) => this.checkOwnage(s)),
      throwIfEmpty(() => new NotFoundException(`segment:${id} not found`)),
    );
  }

  /**
   * Creates a new segment
   *
   * @param segment The segment data to save
   * @returns An observable to the created segment
   */
  save(segment: SegmentDto): Observable<Segment> {
    return from(
      this.segmentModel.create({
        ...segment,
        owner: { _id: this.request.user.id },
      }),
    );
  }

  /**
   * Updates an existing segment
   *
   * @param id The id of the segment to update
   * @param data The data of the segment to update
   * @returns An observable to the updated segment
   * @throws {NotFoundException} If the id does not belong
   * to any segment
   */
  update(id: string, data: SegmentDto): Observable<Segment> {
    return this.findById(id).pipe(
      mergeMap((s) => this.checkOwnage(s)),
      throwIfEmpty(() => new NotFoundException(`segment:${id} not found`)),
      mergeMap((s) => Object.assign(s, data).save()),
    );
  }

  /**
   * Deletes an existing segment
   *
   * @param id The if of the segement to delete
   * @returns An observable to the deleted segment
   * @throws {NotFoundException} If the id does not beong
   * to any segment
   */
  delete(id: string): Observable<Segment> {
    return this.findById(id).pipe(
      mergeMap((s) => this.checkOwnage(s)),
      throwIfEmpty(() => new NotFoundException(`segment:${id} not found`)),
      mergeMap((s) => {
        s.delete();
        return of(s);
      }),
    );
  }
}

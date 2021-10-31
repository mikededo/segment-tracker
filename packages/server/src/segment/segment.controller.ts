import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { JwtGuard } from '@auth/guard/jwt.guard';
import { Segment } from '@database/model/segment.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Scope,
  UseGuards
} from '@nestjs/common';
import { SegmentDto } from '@shared/dto/segment';
import { SegmentStatDto } from '@shared/dto/segment.stat';
import { ParseObjectIdPipe } from '@shared/pipes';

import { FindAllSegmentsQuery } from './segment.interfaces';
import { SegmentService } from './segment.service';

@UseGuards(JwtGuard)
@Controller({ path: 'segments', scope: Scope.REQUEST })
export class SegmentController {
  constructor(private segmentService: SegmentService) {}

  @Get('')
  getAll(@Query() query: FindAllSegmentsQuery = {}): Observable<Segment[]> {
    return this.segmentService.findAll(query);
  }

  @Get(':id')
  getSingle(
    @Param('id', new ParseObjectIdPipe()) id: string
  ): Observable<Segment> {
    return this.segmentService.findById(id);
  }

  @Post('')
  createSegment(
    @Body() body: SegmentDto,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .save(body)
      .pipe(
        map((segment) =>
          response
            .location(`/posts/${segment._id}`)
            .status(HttpStatus.CREATED)
            .send(segment)
        )
      );
  }

  @Patch(':id')
  updateSegment(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() body: SegmentDto,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .update(id, body)
      .pipe(map(() => response.status(HttpStatus.NO_CONTENT).send()));
  }

  @Delete(':id')
  deleteSegment(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .delete(id)
      .pipe(map(() => response.status(HttpStatus.NO_CONTENT).send()));
  }

  @Get(':id/stats')
  getStatsFrom(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .getStatsFrom(id)
      .pipe(map((stats) => response.status(HttpStatus.OK).send(stats)));
  }

  @Post(':id/stats')
  createStat(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() body: SegmentStatDto,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .createStatFor(id, body)
      .pipe(
        map((stat) =>
          response
            .location(`/segments/${id}/stats/${stat._id}`)
            .status(HttpStatus.CREATED)
            .send(stat)
        )
      );
  }

  @Delete(':id/stats/:statId')
  deleteStat(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Param('statId', new ParseObjectIdPipe()) statId: string,
    @Res() response: Response
  ): Observable<Response> {
    return this.segmentService
      .deleteStatFrom(id, statId)
      .pipe(map(() => response.status(HttpStatus.NO_CONTENT).send()));
  }
}

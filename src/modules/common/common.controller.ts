import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '../../exceptions';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { CommonService } from './common.service';
import { FilterRequestDto } from './dtos/request';

@UseInterceptors(LoggingInterceptor)
@Controller('common')
export class CommonController {
  constructor(public service: CommonService) {}

  @Get('hello-world')
  async helloWorld(): Promise<any> {
    return await this.service.helloWorld();
  }

  @Get('success')
  @Serialize()
  async success(): Promise<any> {
    return {
      text: 'hello world',
    };
  }

  @Get('bad-request')
  async badRequest(): Promise<any> {
    throw new BadRequestException('bad request');
  }

  @Get('unauthorized')
  async unauthorized(): Promise<any> {
    throw new UnauthorizedException();
  }

  @Get('forbidden')
  async forbidden(): Promise<any> {
    throw new ForbiddenException();
  }

  @Get('not-found')
  async notFound(): Promise<any> {
    throw new NotFoundException();
  }

  @Get('unprocessable')
  async unprocessable(
    @Query()
    query: FilterRequestDto,
  ): Promise<any> {
    return query;
  }
}

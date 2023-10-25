import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { CommonService } from './common.service';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class CommonController {
  constructor(public service: CommonService) {}

  @Get('hello-world')
  async helloWorld(): Promise<any> {
    return await this.service.helloWorld();
  }
}

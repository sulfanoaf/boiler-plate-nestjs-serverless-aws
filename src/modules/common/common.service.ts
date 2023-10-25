import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  async helloWorld() {
    return 'hello world';
  }
}

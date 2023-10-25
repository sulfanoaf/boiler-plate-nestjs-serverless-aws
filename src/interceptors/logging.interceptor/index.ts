import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/* istanbul ignore next */
const logResponse = data => {
  console.log(data);
};

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    console.log({
      params: request.params,
      query: request.query,
      body: request.body,
      route: {
        path: request.route.path,
        methods: request.route.methods,
      },
    });

    const o = tap(logResponse);

    return next.handle().pipe(o);
  }
}

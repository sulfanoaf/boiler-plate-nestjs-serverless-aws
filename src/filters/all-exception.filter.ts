import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    console.error(exception);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let exceptionData: any;
    if (exception instanceof HttpException) {
      exceptionData = exception.getResponse();
    } else if (exception instanceof Error) {
      exceptionData = exception.message;
    } else {
      exceptionData = exception;
    }

    delete exceptionData?.additionalInfo;

    const errorInfo =
      typeof exceptionData === 'string'
        ? { message: exceptionData }
        : exceptionData;

    const responseBody = {
      success: false,
      ...errorInfo,
    };

    ctx.getResponse().status(httpStatus).send(responseBody);
  }
}

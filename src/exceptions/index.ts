import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(message || 'Bad request', HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message || 'Forbidden', HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Not found', HttpStatus.NOT_FOUND);
  }
}

interface IUnprocessableEntity {
  [key: string]: string[];
}

export class UnprocessableEntityException extends HttpException {
  constructor(validationErrors: ValidationError[], message?: string) {
    const errs = [];
    const errors = validationErrors || [];

    const _mapErrors = errors => {
      for (let i = 0; i < errors.length; i++) {
        const e = errors[i];
        if (e.constraints) {
          errs.push(e);
          continue;
        } else if (e.children.length > 0) {
          _mapErrors(e.children);
        }
      }
    };

    _mapErrors(errors);
    const validations: IUnprocessableEntity = errs.reduce((res, value) => {
      res[value.property] = Object.keys(value.constraints).map(
        key => value.constraints[key],
      );
      return res;
    }, {});

    super(
      {
        errors: validations,
        message: message || 'Invalid request params',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

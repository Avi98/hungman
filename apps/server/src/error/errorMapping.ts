import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { buildHttpExceptionObject } from './exceptionObject';

export const ErrorMap = new Map([
  ['EmailExists', (object) => new ConflictException(object)],
  ['UsernameExistsUsernameExists', (object) => new ConflictException(object)],
]);

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.catch(HttpExceptionFilter.transformExceptions(exception), host);
  }

  private static transformExceptions(error: Error) {
    const errorException = ErrorMap.get(error.name);

    const errorType = errorException(
      buildHttpExceptionObject(error.name, error.message),
    );

    return errorType;
  }
}

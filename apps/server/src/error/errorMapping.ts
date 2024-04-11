import { ArgumentsHost, Catch, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { buildHttpExceptionObject } from './exceptionObject';

export const ErrorMap = new Map([
  ['EmailExists', (object) => new ConflictException(object)],
  ['UsernameExists', (object) => new ConflictException(object)],
]);

@Catch()
export class ErrorExceptionMap extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.catch(ErrorExceptionMap.transformExceptions(exception), host);
  }

  private static transformExceptions(error: Error) {
    const errorException = ErrorMap.get(error.name);
    const errorType = errorException(
      buildHttpExceptionObject(error.name, error.message),
    );

    return errorType;
  }
}

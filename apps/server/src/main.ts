import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ErrorExceptionMap } from './error/errorMapping';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(ConfigService);
  app.enableCors({
    //TODO remove in prod
    origin: ['http://localhost:3000'],
  });
  //
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      skipMissingProperties: true,
      exceptionFactory: (errors) => {
        console.error({ errors });
      },
    }),
  );
  const port = appConfig.get('port');
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionMap(httpAdapter));

  await app.listen(port);
  console.log('BE server running on port ', port);
}
bootstrap();

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './error/errorMapping';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);
  app.enableCors({
    //TODO remove in prod
    origin: ['*'],
  });

  const port = appConfig.get('port');

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  await app.listen(port);
  console.log('BE server running on port ', port);
}
bootstrap();

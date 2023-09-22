import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RequestMethod } from '@nestjs/common';
import { HttpExceptionFilter } from './infra/middleware/http-exception.filter';
import { ILoggerService } from './shared/logger/interface/logger-service.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);
  const logger = app.get(ILoggerService);

  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(configService.get('app.port'));
}
bootstrap();

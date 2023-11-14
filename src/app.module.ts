import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';
import utilConfig from './config/util.config';
import { LoggerModule } from './shared/logger/logger.module';
import { CacheModule } from './shared/cache/cache.module';
import { reqResLogMiddleware } from './infra/middleware/req-res-log.middleware';
import { UploadModule } from './upload/upload.module';
import s3Config from './config/s3.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod', // Store produnction env on cicd
      load: [appConfig, databaseConfig, cacheConfig, utilConfig, s3Config],
    }),
    LoggerModule,
    CacheModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(reqResLogMiddleware).forRoutes('*');
  }
}

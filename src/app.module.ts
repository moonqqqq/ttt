import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';
import utilConfig from './config/util.config';
import { LoggerModule } from './shared/logger/logger.module';
// import { CacheModule } from './shared/cache/cache.module';
import { reqResLogMiddleware } from './infra/middleware/req-res-log.middleware';
import { UploadModule } from './upload/upload.module';
import { RoomModule } from './room/room.module';
import s3Config from './config/s3.config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { MediaModule } from './media/media.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { FaqModule } from './faq/faq.module';
import { ModelModule } from './model/model.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      // ignoreEnvFile: process.env.NODE_ENV === 'prod', // Store produnction env on cicd
      load: [appConfig, databaseConfig, cacheConfig, utilConfig, s3Config],
    }),
    LoggerModule,
    // CacheModule,
    UploadModule,
    RoomModule,
    PrismaModule,
    MediaModule,
    PortfolioModule,
    FaqModule,
    ModelModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(reqResLogMiddleware).forRoutes('*');
  }
}

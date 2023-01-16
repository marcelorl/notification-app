import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './modules/config/configuration';
import { LogHistoryModule } from './modules/logHistory/logHistory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    LogHistoryModule,
  ],
})
export class AppModule {}

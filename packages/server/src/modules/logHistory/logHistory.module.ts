import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogHistoryService } from './logHistory.service';
import { LogHistory, LogHistorySchema } from './entities/logHistory.entity';
import { LogHistoryController } from './logHistory.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: LogHistory.name, useFactory: () => LogHistorySchema },
    ]),
  ],
  controllers: [LogHistoryController],
  providers: [LogHistoryService],
})
export class LogHistoryModule {}

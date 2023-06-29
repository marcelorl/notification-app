import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationService } from './notification.service';
import { LogHistory, LogHistorySchema } from './entities/logHistory.entity';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: LogHistory.name, useFactory: () => LogHistorySchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

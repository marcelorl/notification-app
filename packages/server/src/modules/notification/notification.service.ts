import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  LogHistory,
  LogHistoryDocument,
  User,
} from './entities/logHistory.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { mockData } from '../../data/data';
import { Notification } from './engines/notification';
import { Sms } from './engines/sms';
import { Push } from './engines/push';
import { Email } from './engines/email';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(LogHistory.name)
    private readonly logHistory: Model<LogHistoryDocument>,
  ) {}

  async notify(data: CreateMessageDto): Promise<LogHistory> {
    const Strategies = {
      sms: Sms,
      push: Push,
      email: Email,
    } as const;

    const { users } = mockData;

    const usersToBeSaved = (users as User[]).reduce((acc, user) => {
      if (user.channels.includes(data.category)) {
        user.subscribed.forEach((engine) => {
          new Notification(new Strategies[engine]()).notify({
            user,
            message: data.message,
          });
        });

        acc.push(user);
      }

      return acc;
    }, [] as User[]);

    return this.logHistory.create({
      users: usersToBeSaved,
      message: data.message,
    });
  }

  getMessages() {
    return this.logHistory.find();
  }
}

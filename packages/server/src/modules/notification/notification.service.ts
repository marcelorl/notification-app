import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LogHistory, LogHistoryDocument } from './entities/logHistory.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { mockData } from '../../data/data';
import { Notification } from './engines/notification';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(LogHistory.name)
    private readonly logHistory: Model<LogHistoryDocument>,
  ) {}

  async notify(data: CreateMessageDto): Promise<LogHistory> {
    const { users } = mockData;

    const usersToBeSaved = users.reduce((acc, user) => {
      if (user.channels.some((channel) => data.category.includes(channel))) {
        acc.push(user);
      }

      return acc;
    }, []);

    new Notification().notify({
      users: usersToBeSaved,
      message: data.message,
    });

    return this.logHistory.create({
      users: usersToBeSaved,
      message: data.message,
    });
  }

  getMessages() {
    return this.logHistory.find();
  }
}

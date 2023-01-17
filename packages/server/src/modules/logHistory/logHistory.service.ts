import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LogHistory, LogHistoryDocument } from './entities/logHistory.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { mockData } from '../../data/data';

@Injectable()
export class LogHistoryService {
  constructor(
    @InjectModel(LogHistory.name)
    private readonly logHistory: Model<LogHistoryDocument>,
  ) {}

  async createLogHistory(data: CreateMessageDto): Promise<LogHistory> {
    const { users } = mockData;

    const usersToBeSaved = users.reduce((acc, user) => {
      if (user.channels.some((channel) => data.category.includes(channel))) {
        acc.push(user);
      }

      return acc;
    }, []);

    const logHistory = new this.logHistory({
      users: usersToBeSaved,
      message: data.message,
    });

    return logHistory.save();
  }

  getMessages() {
    return this.logHistory.find();
  }
}

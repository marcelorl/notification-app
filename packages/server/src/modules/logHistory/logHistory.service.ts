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

  async createLogHistory(data: CreateMessageDto): Promise<LogHistory[]> {
    const { users } = mockData;

    const userSavePromises = users.reduce((acc, user) => {
      if (user.channels.some((channel) => data.category.includes(channel))) {
        const userToBeSaved = {
          ...user,
          message: data.message,
        };
        const logHistory = new this.logHistory(userToBeSaved);
        acc.push(logHistory.save());
      }

      return acc;
    }, []);

    return await Promise.all(userSavePromises);
  }

  getMessages () {
    return this.logHistory.find()
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LogHistory, LogHistoryDocument } from './entities/logHistory.entity';

@Injectable()
export class LogHistoryService {
  constructor(
    @InjectModel(LogHistory.name)
    private readonly logHistory: Model<LogHistoryDocument>,
  ) {}

  async createLogHistory(data: any): Promise<LogHistory> {
    const logHistory = new this.logHistory(data);
    await logHistory.save();

    return logHistory;
  }
}

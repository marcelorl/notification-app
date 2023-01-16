import { Controller, Post, Body, Get } from '@nestjs/common';

import { LogHistoryService } from './logHistory.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('/message')
export class LogHistoryController {
  constructor(private logHistoryService: LogHistoryService) {}

  @Post()
  createTransaction(@Body() body: CreateMessageDto) {
    return this.logHistoryService.createLogHistory(body);
  }

  @Get()
  getMessages() {
    return this.logHistoryService.getMessages()
  }
}

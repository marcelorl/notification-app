import { Controller, Post, Body, Get, Response } from '@nestjs/common';

import { LogHistoryService } from './logHistory.service';

@Controller('')
export class LogHistoryController {
  constructor(private logHistoryService: LogHistoryService) {}

  @Post('/message')
  createTransaction(@Body() body: any) {
    return this.logHistoryService.createLogHistory(body);
  }
}

import { Controller, Post, Body, Get } from '@nestjs/common';

import { NotificationService } from './notification.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('/notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  notify(@Body() body: CreateMessageDto) {
    return this.notificationService.notify(body);
  }

  @Get()
  getMessages() {
    return this.notificationService.getMessages();
  }
}

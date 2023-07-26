import { User } from '../entities/logHistory.entity';
import { NotificationEngine } from '../types/general.type';

export class Notification {
  private strategy: NotificationEngine;

  constructor(strategy: NotificationEngine) {
    this.strategy = strategy;
  }

  notify(data: { message: string; user: User }): void {
    data.user.subscribed.map(() => {
      return this.strategy.send(data.message, data.user.name);
    });
  }
}

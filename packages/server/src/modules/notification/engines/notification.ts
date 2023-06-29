import { Sms } from './sms';
import { Email } from './email';
import { Push } from './push';
import { User } from '../entities/logHistory.entity';

export class Notification {
  engines = {
    sms: Sms,
    email: Email,
    push: Push,
  };

  notify(data: { message: string; users: User[] }) {
    data.users.forEach((user) => {
      user.subscribed.forEach((type) => {
        const notifierService = new this.engines[type]();
        notifierService.send(data.message, user.name);
      });
    });
  }
}

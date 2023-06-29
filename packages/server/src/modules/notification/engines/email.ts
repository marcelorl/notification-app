import { NotificationEngine } from '../types/general.type';

export class Email implements NotificationEngine {
  send(message: string, name: string) {
    console.log('EMAIL', { message, name });
  }
}

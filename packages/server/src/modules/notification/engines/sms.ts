import { NotificationEngine } from '../types/general.type';

export class Sms implements NotificationEngine {
  send(message: string, name: string) {
    console.log('SMS', { message, name });
  }
}

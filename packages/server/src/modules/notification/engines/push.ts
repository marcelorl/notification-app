import { NotificationEngine } from '../types/general.type';

export class Push implements NotificationEngine {
  send(message: string, name: string) {
    console.log('PUSH NOTIFICATION', { message, name });
  }
}

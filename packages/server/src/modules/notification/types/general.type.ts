export interface NotificationEngine {
  send: (message: string, name: string) => void;
}

export type Channel = 'sports' | 'finance' | 'movies';

export type EngineType = 'sms' | 'push' | 'email';

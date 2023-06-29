export interface NotificationEngine {
  send: (message: string, name: string) => void;
}

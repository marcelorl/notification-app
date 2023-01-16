import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type LogHistoryDocument = LogHistory & Document;

@Schema()
export class LogHistory {
  @Prop(String)
  name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  phone: string;

  @Prop(String)
  message: string;

  @Prop(Array(String))
  subscribed: string[];

  @Prop(Array(String))
  channels: string[];

  @Prop({ default: now() })
  createdAt: Date;
}

export const LogHistorySchema = SchemaFactory.createForClass(LogHistory);

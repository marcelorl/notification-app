import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LogHistoryDocument = LogHistory & Document;

@Schema()
export class LogHistory {
  @Prop(String)
  name: string;

  @Prop(String)
  email: string;

  @Prop(String)
  phone: string;

  @Prop(Array(String))
  subscribed: string[];

  @Prop(Array(String))
  channels: string[];
}

export const LogHistorySchema = SchemaFactory.createForClass(LogHistory);

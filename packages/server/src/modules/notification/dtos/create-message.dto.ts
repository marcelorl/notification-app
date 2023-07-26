import { IsDefined, IsString } from 'class-validator';

import { Channel } from '../types/general.type';

export class CreateMessageDto {
  @IsString()
  @IsDefined()
  category: Channel;

  @IsString()
  @IsDefined()
  message: string;
}

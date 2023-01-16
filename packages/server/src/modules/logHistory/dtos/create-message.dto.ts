import { IsDefined, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsDefined()
    category: string;

    @IsString()
    @IsDefined()
    message: string;
}
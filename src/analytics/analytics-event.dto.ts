import { IsEnum } from 'class-validator';
import { EventType } from './enum/EventType';

export class CreateAnalyticsEventDto {
    @IsEnum(EventType)
    event: EventType;

    sender: string;
}
import { IsEnum } from 'class-validator';
import { EventType } from '../enum/EventType';

export class AnalyticsEventDto {
    @IsEnum(EventType, { message: 'event must be a valid EventType'})
    event: EventType;
}
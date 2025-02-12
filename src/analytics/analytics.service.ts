import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from './analytics-event.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './enum/EventType';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(AnalyticsEvent)
        private readonly analyticsEventsRepository: Repository<AnalyticsEvent>
    ) {}

    async create(senderUuid: string, event: EventType): Promise<AnalyticsEvent> {
        const newEvent = new AnalyticsEvent();
        newEvent.sender = senderUuid;
        newEvent.event = event;

        return this.analyticsEventsRepository.save(newEvent);
    }
}

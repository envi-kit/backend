import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AnalyticsEvent } from './model/analytics-event.model';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './enum/EventType';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(AnalyticsEvent)
        private readonly analyticsEventsRepository: Repository<AnalyticsEvent>
    ) {}

    async create(senderUuid: string, event: EventType): Promise<AnalyticsEvent> {
        const createdEvent = this.analyticsEventsRepository.create({
            sender: senderUuid,
            event: event
        });

        return this.analyticsEventsRepository.save(createdEvent);
    }

    async find(limit: number, offset: number): Promise<AnalyticsEvent[]> {
        return this.analyticsEventsRepository.find({
            take: limit,
            skip: offset
        });
    }
}

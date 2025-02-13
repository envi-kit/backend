import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsEvent } from './model/analytics-event.model';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [AnalyticsService]
})
export class AnalyticsModule {}

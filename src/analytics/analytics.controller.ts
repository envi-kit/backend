import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AnalyticsEvent } from './model/analytics-event.model';
import { AnalyticsService } from './analytics.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AnalyticsEventDto } from './dto/analytics-event.dto';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @ApiOperation({ description: 'Get events' })
    @Get('events')
    @ApiQuery({ name: 'limit', required: false, example: 100 })
    @ApiQuery({ name: 'offset', required: false, example: 0 })
    async getEvents(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0
    ): Promise<AnalyticsEvent[]> {
        return await this.analyticsService.find(limit, offset);
    }

    @ApiOperation({ description: 'Create new event from sender perspective' })
    @Post('events')
    async createEvent(
        @CurrentUser() user: User,
        @Body() eventDto: AnalyticsEventDto,
    ): Promise<AnalyticsEvent> {
        return await this.analyticsService.create(user.id, eventDto.event);
    }
}

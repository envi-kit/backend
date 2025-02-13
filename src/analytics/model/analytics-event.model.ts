import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../enum/EventType';

@Entity({ name: 'analytic_events' })
export class AnalyticsEvent {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Index()
    @Column({ type: 'varchar', length: 36, nullable: false })
    sender: string

    @Column({ type: 'enum', enum: EventType, nullable: false })
    event: EventType

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}
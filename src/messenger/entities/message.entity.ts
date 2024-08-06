import { MaxLength } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "src/user/entities/user.entity";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    channelId: string

    @Column()
    userId: string

    @Column({ default: ""})
    @MaxLength(255)
    text: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel: Channel

    @ManyToOne(() => User, user => user.messages)
    user: User
}

import { MaxLength } from "class-validator";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    channelId: string

    @Column()
    sender: string

    @Column({ default: ""})
    @MaxLength(255)
    text: string

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel: Channel
}

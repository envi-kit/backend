import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity("messenger_channels")
export class Channel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string

    @Column({unique: true})
    pretty_name: string

    @OneToMany(() => Message, message => message.channel)
    messages: Message[]
}
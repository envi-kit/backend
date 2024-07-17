import { MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("messages")
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    channel: string

    @Column()
    sender: string

    @Column({ default: ""})
    @MaxLength(255)
    text: string
}

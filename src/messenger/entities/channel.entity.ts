import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("messenger_channels")
export class Channel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    name: string
}
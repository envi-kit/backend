import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractObject {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column()
    sceneId: number

    @Column()
    type: string

    @Column()
    tag: string
}
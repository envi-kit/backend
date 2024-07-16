import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("scenes")
export class Scene {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    constructor(partial: Partial<Scene>) {
        Object.assign(this, partial);
    }
}
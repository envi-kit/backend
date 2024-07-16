import { Column, Entity } from "typeorm";
import { AbstractObject } from "./abstract.entity";

@Entity("screens")
export class Screen extends AbstractObject {
    @Column({ default: "screen" })
    type: string

    @Column()
    imagePath: string
}
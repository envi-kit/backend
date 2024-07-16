import { Column, Entity } from "typeorm";
import { AbstractObject } from "./abstract.entity";

@Entity("stands")
export class Stand extends AbstractObject {
    @Column({ default: "stand" })
    type: string

    @Column()
    url: string
}
import { Exclude } from 'class-transformer'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ default: 'SharjaMale1' })
    avatarModelName: string

    @Column({ default: 'default.png' })
    iconPicture: string

    @Column({ default: 'en' })
    language: string

    @Column({ default: true })
    showNicknames: boolean

    @Column({ default: true })
    enableMusic: boolean

    @Column({ default: "visitor" })
    role: string
    
    @Column()
    @Exclude()
    password: string

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

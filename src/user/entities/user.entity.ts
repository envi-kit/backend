import { Exclude } from 'class-transformer'
import { Message } from 'src/messenger/entities/message.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ default: 'SharjaMale1' })
    avatarModelName: string

    @Column({ default: 'default.png' })
    iconPicture: string

    @Column({ default: '' })
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

    @OneToMany(() => Message, message => message.userId)
    messages: Message[]

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}

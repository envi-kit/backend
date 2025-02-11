import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }

    async update(id: string, userData: Partial<User>): Promise<User | null> {
        await this.usersRepository.update(id, userData);
        return this.findById(id);
    }

    async updateSettings(id: string, settingsData: string) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.settings = settingsData;
        return this.usersRepository.save(user);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.usersRepository.delete(id);
        return result.affected > 0;
    }

    async register(email: string, name: string, password: string): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email } });

        if (existingUser) throw new Error('User with same email already exist');

        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, name, passwordHash });

        return this.usersRepository.save(user);
    }
}

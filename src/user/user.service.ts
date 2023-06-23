import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './response/users.response';
import { AuthService } from 'src/auth/auth.service';
import { UserUpdateDto } from './dto/user-update.dto';
import * as bcrypt from "bcrypt";
import { UserResponseInterface } from './response/user.response';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private readonly authServics: AuthService
    ) { }

    //Get All Users
    async getAllUsers(): Promise<UserInterface[]> {
        try {
            const users = await this.userRepo.find({ select: ['email', 'name'] });
            return users.map((user) => {
                return {
                    name: user.name,
                    email: user.email
                }
            })

        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        }
    }

    //Update User 
    async updateUser(id: number, dto: UserUpdateDto): Promise<UserResponseInterface> {
        try {
            const user = await this.userRepo.findOne({ where: { id: id } });
            if (!user) throw new HttpException("User Not Found", HttpStatus.NOT_FOUND);
            const tokens = await this.authServics.getTokens(id, dto.name);
            await this.userRepo.update(id, {
                email: dto.email,
                password: await bcrypt.hash(dto.password, 10),
                name: dto.name,
                address: dto.address,
                avatarPath: dto.avatarPath,
                refreshToken: tokens.refreshToken
            });
            await this.authServics.updateRefreshToken(id, tokens.refreshToken);
            const newUser = await this.userRepo.findOne({ where: { id: id }, select: ["email", "name", "refreshToken"] });
            return {
                name: newUser.name,
                email: newUser.email,
                accessToken: tokens.accessToken,
                refreshToken: newUser.refreshToken
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //Get User By Id
    async getById(id: number): Promise<UserInterface> {
        try {
            const user = await this.userRepo.findOne({ where: { id: id } });
            if (!user) throw new HttpException('User Not Found!!!', HttpStatus.NOT_FOUND);
            return {
                name: user.name,
                email: user.email,
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_FOUND);

        }
    }
}

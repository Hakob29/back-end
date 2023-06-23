import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { UserInterface } from './response/user.response';
import * as  bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './response/login.response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        private jwtService: JwtService,
        private readonly configService: ConfigService

    ) { }


    //Register
    async register(dto: RegisterDto): Promise<UserInterface> {
        try {
            const newUser = await this.userRepo.create({
                name: dto.name,
                email: dto.email,
                password: await bcrypt.hash(dto.password, 10),
                address: dto.address,
                avatarPath: dto.avatarPath,
                refreshToken: dto.refreshToken
            });
            await this.userRepo.save(newUser);
            const tokens = await this.getTokens(newUser.id, newUser.name);
            await this.updateRefreshToken(newUser.id, tokens.refreshToken);

            return {
                name: newUser.name,
                email: newUser.email,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    //Login
    async login(dto: LoginDto): Promise<LoginResponse> {
        try {
            const user = await this.userRepo.findOne({ where: { email: dto.email }, select: ["email", "password", "name", "id"] });

            if (!user) throw new HttpException("WRONG EMAIL!!!", HttpStatus.BAD_REQUEST);
            if (!(await bcrypt.compare(dto.password, user.password))) {
                throw new HttpException("WRONG PASSWORD!!!", HttpStatus.BAD_REQUEST);
            }
            const tokens = await this.getTokens(user.id, user.name);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            };
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }

    //Update Refresh Token
    async updateRefreshToken(id: number, refreshToken: string) {
        try {
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            await this.userRepo.update(id, {
                refreshToken: hashedRefreshToken,
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }



    //Get Access And Refresh Tokens
    async getTokens(id: number, username: string) {
        try {
            const [accessToken, refreshToken] = await Promise.all([
                this.jwtService.signAsync(
                    {
                        sub: id,
                        username,
                    },
                    {
                        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                        expiresIn: '15m',
                    },
                ),
                this.jwtService.signAsync(
                    {
                        sub: id,
                        username,
                    },
                    {
                        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                        expiresIn: '7d',
                    },
                ),
            ]);

            return {
                accessToken,
                refreshToken,
            };
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }


    //Log Out
    async logout(user: UserEntity) {
        try {
            return await this.userRepo.update(user["sub"], { refreshToken: null });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}




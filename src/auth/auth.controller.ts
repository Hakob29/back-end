import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserInterface } from './response/user.response';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './response/login.response';
import { CurrentUser } from 'src/auth/decerators/user.decerator';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,

    ) { }

    //Register
    @Post("/register")
    async register(
        @Body() dto: RegisterDto
    ): Promise<UserInterface> {
        return await this.authService.register(dto);
    }

    //Login
    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async login(
        @Body() dto: LoginDto
    ): Promise<LoginResponse> {
        return await this.authService.login(dto);
    }

    //Log Out
    @UseGuards(AuthGuard("jwt"))
    @Get("/logOut")
    async logOut(
        @CurrentUser() user: UserEntity
    ) {
        return await this.authService.logout(user);
    }
}

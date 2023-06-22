import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserInterface } from './response/user.response';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './response/login.response';

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
    @HttpCode(200)
    @Post("/login")
    async login(
        @Body() dto: LoginDto
    ): Promise<LoginResponse> {
        return await this.authService.login(dto);
    }
}

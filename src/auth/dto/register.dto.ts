import { IsEmail, IsString } from "class-validator";

export class RegisterDto {

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    name: string

    @IsString()
    address: string

    @IsString()
    avatarPath: string

    @IsString()
    refreshToken: string
}
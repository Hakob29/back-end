import { IsEmail, IsString } from "class-validator"

export class UserDto {

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
}
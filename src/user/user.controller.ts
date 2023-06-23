import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './response/users.response';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    //Get All Users
    @Get("/all")
    async getAllUsers(): Promise<UserInterface[]> {
        return await this.userService.getAllUsers();
    }


    //Update User 
    @Put('/update/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() dto: UserUpdateDto
    ) {
        return await this.userService.updateUser(id, dto);
    }

    //Get By Id
    @Get('/:id')
    async getById(
        @Param('id') id: number
    ): Promise<UserInterface> {
        return await this.userService.getById(id);
    }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async getUserList() {
    return this.userService.getAllUsers();
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('account/:userId/animal')
  async addAnimalToUser() {
    return 'New animal added to user';
  }

  @Delete(':userId')
  async deleteUserAccount() {
    return 'User deleted';
  }

  @Patch(':userId')
  async updateUserProfile() {
    return 'User updated profile';
  }

  @Get(':userId')
  async getUserProfile(@Param('userId') id: string) {
    return this.userService.getOneUserAccount(id);
  }
}

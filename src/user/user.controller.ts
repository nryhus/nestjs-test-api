import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  PaginatedDTO,
} from '../common/pagination/response';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import {
  UserCreateDto,
  UserLoginDto,
  UserLoginSocialDto,
} from './dto/user.dto';
import { PublicUserData } from './interface/user.interfacer';
import { UserService } from './user.service';

@ApiTags('User')
@ApiExtraModels(PublicUserData, PaginatedDTO)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @ApiPaginatedResponse('entities', PublicUserData)
  @Get('list')
  async getUserList(@Query() query: PublicUserInfoDto) {
    return this.userService.getAllUsers(query);
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('login')
  async loginUser(@Body() body: UserLoginDto) {
    return this.userService.login(body);
  }

  @Post('social/login')
  async loginSocialUser(@Body() body: UserLoginSocialDto) {
    return this.userService.loginSocial(body);
  }

  // @Post('account/:userId/animal')
  // async addAnimalToUser() {
  //   return 'New animal added to user';
  // }

  // @Delete(':userId')
  // async deleteUserAccount() {
  //   return 'User deleted';
  // }

  // @Patch(':userId')
  // async updateUserProfile() {
  //   return 'User updated profile';
  // }

  // @Get(':userId')
  // async getUserProfile(@Param('userId') id: string) {
  //   return this.userService.getOneUserAccount(id);
  // }
}

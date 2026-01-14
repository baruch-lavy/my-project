import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/role.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get(':email')
  @UseGuards(AuthGuard)
  async getUser(@Param() param: object, @Req() req : object) {
    return await this.userService.findOne(param['email'], req['user']);
  }
}

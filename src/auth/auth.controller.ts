import {
  Body,
  Request,
  UseGuards,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './metaData';
import { LoginUserDto } from './dto/login-user.dto';
import { createAdminDto } from '../admin/dto/adminRegister.dto';
import { creatorGuard } from './creator.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.logIn(signInDto);
  }

  @Public()
  @Post('/admin/register')
  registerAdmin(@Body() createAdminDto: createAdminDto) {
    return this.authService.registerAdmin(createAdminDto);
  }

  @Public()
  @Post('/admin/login')
  loginAdmin(@Body() loginDto: LoginUserDto) {
    console.log('in login');
    return this.authService.loginAdmin(loginDto);
  }
  
  @Public()
  @Post('/admin/verify/:id')
  @UseGuards(creatorGuard)
  async verifyAdmin(@Param('id') id: number) {
    return await this.authService.verifyAdmin(id);
  }
}

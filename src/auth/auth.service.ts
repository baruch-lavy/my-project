import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.usersService.findOne(
        createUserDto.email,
      );
      if (existingUser) {
        console.log('existingUser', existingUser);
        throw new BadRequestException(`${createUserDto.email} already in use`);
      }
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.usersService.create({
        ...createUserDto,
        password: hashPassword,
      });

      const token = await this.generateToken(user, createUserDto.role);
      return {
        token
      };
    } catch (err) {
      console.log('err in register', err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async signIn(loginDto : LoginUserDto): Promise<{ token: string } | undefined> {
    try {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user, user.role);
    return {
      token
    };
    } catch (error) {
      console.log('error in login', error);
    }
  }

  private async validateUser(loginDto: LoginUserDto) {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) throw new BadRequestException();
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.dataValues.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException("not authorize");
  }

  async generateToken(user: User, role : string) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: role
      };
      return await this.jwtService.signAsync(payload);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}

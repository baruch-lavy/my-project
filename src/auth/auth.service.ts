import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../users/entities/user.entity';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/entities/admin.entity';
import { createAdminDto } from '../admin/dto/adminRegister.dto';
import { errorHandler } from '../app/catchError';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, 
    private adminService : AdminService
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

      const token = await this.generateToken(user);
      return {
        token
      };
    } catch (err) {
      console.log('err in register', err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async logIn(loginDto : LoginUserDto): Promise<{ token: string } | undefined> {
    try {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
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

  async generateToken(user: User) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: "USER"
      };
      return await this.jwtService.signAsync(payload);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

    async loginAdmin(loginDto: LoginUserDto) {
    const admin = await this.validateAdmin(loginDto);
    const token = await this.generateTokenAdmin(admin);
    return {
      token,
      id: admin.id
    };
  }

    async generateTokenAdmin(user: Admin) {
    try {
      const payload = {
        email: user.email,
        sub: user.id,
        role: "ADMIN"
      };
      return this.jwtService.sign(payload);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  private async validateAdmin(loginDto: LoginUserDto) {
    const admin = await this.adminService.getByEmail(loginDto.email);
    if (!admin) {
      throw new NotFoundException("Bunday Admin TOpilmadi!");
    }
    const passwordEquels = await bcrypt.compare(
      loginDto.password,
      admin.password
    );
    if (admin && passwordEquels) {
      return admin;
    }
    throw new UnauthorizedException("Email Yoki Parol Hato!");
  }


  async registerAdmin(createAdminDto: createAdminDto) {
    try {
      const candidate = await this.adminService.getByEmail(
        createAdminDto.email
      );

      if (candidate) {
        console.log(candidate);
        throw new BadRequestException(
          `${createAdminDto.email} is already in use`
        );
      }
      const hashPassword = await bcrypt.hash(createAdminDto.password, 10);
      const admin = await this.adminService.createAdmin({
        ...createAdminDto,
        password: hashPassword
      });
      if (!admin) throw new NotFoundException('admid not found')
      const token = await this.generateTokenAdmin(admin);
      return {
        token,
        id: admin.id
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async verifyAdmin(id: number) {
    try {
      const adminExists = await this.adminService.findOne(id);
      if (!adminExists) {
        throw new NotFoundException("admin with that id is not exist");
      }
      if (adminExists.is_verified) {
        throw new BadRequestException("Bu admin uje verifikatsiyadan o'tgan!");
      }
      await this.adminService.verify(id);
      return {
        status: "OK",
        data: { ...adminExists.dataValues, is_verified: true }
      };
    } catch (e) {
      errorHandler(e);
    }
  }
}

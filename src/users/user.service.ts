import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto as any);
    } catch (err) {
      throw new BadRequestException(err.message, 'ERROR!');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(email: string, loggedInUser?): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({
      where: {
        email,
      },
    });
    // if (!user) throw new BadRequestException()
      if (loggedInUser && (loggedInUser.username !== user?.name) && loggedInUser.role !== 'admin') {
        throw new UnauthorizedException()
      }
    return user
    } catch (error) {
      throw error
    }
  }

  async findOneById(id: number): Promise<User | null | undefined> {
    try {
      return await this.userModel.findOne({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException(err.message, "ERROR!");
    }
  }

  async remove(email: string): Promise<void> {
    const user = await this.findOne(email);
    await user?.destroy();
  }
}

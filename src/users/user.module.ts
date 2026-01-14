
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';

//db
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
  imports : [SequelizeModule.forFeature([User])],
  controllers : [UserController],
  providers: [UsersService],
  exports: [UsersService, SequelizeModule], 
})

export class UsersModule {}

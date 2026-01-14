import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//db
import { SequelizeModule } from '@nestjs/sequelize';

//modules
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/user.module';
import { ShiftModule } from '../shifts/shift.module';
import { AssignmentsModule } from '../assignments/assignment.module';

//entities
import { User } from '../users/entities/user.entity';
import { Shift } from '../shifts/entities/shift.entity';
import { Assignment } from '../assignments/entities/assignment.entity';

//config
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ShiftModule,
    AssignmentsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3307,
      username: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD,
      database: 'gurding-system',
      models: [User, Shift, Assignment],
      autoLoadModels : true,
      synchronize : true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

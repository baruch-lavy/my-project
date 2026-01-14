
import { Module } from '@nestjs/common';
import { ShiftController } from './shift.controller';

//db
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './entities/shift.entity';
import { ShiftService } from './shift.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports : [SequelizeModule.forFeature([Shift]), AuthModule],
  controllers : [ShiftController],
  providers: [ShiftService],
  exports: [ShiftService, SequelizeModule], 
})

export class ShiftModule {}

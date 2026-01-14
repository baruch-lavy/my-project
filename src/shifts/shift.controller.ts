import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { CreateShiftDto } from './dto/create-shift.dto';
import { adminGuard } from '../auth/admin.guard';

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get()
  @UseGuards(adminGuard)
  @Roles(Role.Admin)
  async getShifts() {
    return await this.shiftService.findAll();
  }

  @Post('/create')
  @UseGuards(adminGuard)
  @Roles(Role.Admin)
  async createShift(@Body() shift: CreateShiftDto) {
    return await this.shiftService.create(shift);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  async getShift(@Param() param: object) {
    return await this.shiftService.findOne(param['id']);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async deleteShift(@Param() param: object) {
    return await this.shiftService.remove(param['id']);
  }
}

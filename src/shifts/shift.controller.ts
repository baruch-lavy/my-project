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

@Controller('shift')
export class ShiftController {
  constructor(private shiftService: ShiftService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getShifts() {
    return await this.shiftService.findAll();
  }

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createShift(@Body() shift: CreateShiftDto) {
    return await this.shiftService.create(shift);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getShift(@Param() param: object) {
    return await this.shiftService.findOne(param['id']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteShift(@Param() param: object) {
    return await this.shiftService.remove(param['id']);
  }
}

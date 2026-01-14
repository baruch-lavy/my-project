import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from '../role/role.guard';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getShifts() {
    return await this.assignmentService.findAll();
  }

  @Post('/create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createShift(@Body() assignment: CreateAssignmentDto) {
    return await this.assignmentService.create(assignment);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getShift(@Param() param: object) {
    return await this.assignmentService.findOne(param['id']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteShift(@Param() param: object) {
    return await this.assignmentService.remove(param['id']);
  }
}

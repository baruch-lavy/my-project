
import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';

//db
import { SequelizeModule } from '@nestjs/sequelize';
import { Assignment } from './entities/assignment.entity';
import { AssignmentService } from './assignment.service';

@Module({
  imports : [SequelizeModule.forFeature([Assignment])],
  controllers : [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService, SequelizeModule], 
})

export class AssignmentsModule {}

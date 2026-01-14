import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Assignment } from './entities/assignment.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment)
    private AssignmentModel: typeof Assignment,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    try {
      return await this.AssignmentModel.create(createAssignmentDto as any);
    } catch (err) {
      throw new BadRequestException(err.message, 'ERROR!');
    }
  }

  async findAll(): Promise<Assignment[] | string> {
    try {
      const Assignments = await this.AssignmentModel.findAll();
      if (!Assignments.length) return 'there is no Assignments';
      return Assignments;
    } catch (error) {
      throw new BadRequestException(error.message, 'ERROR!');
    }
  }

  async findOne(id: string): Promise<Assignment | null> {
    try {
      const Assignment = await this.AssignmentModel.findOne({
        where: {
          id,
        },
      });
      if (!Assignment) throw new BadRequestException();
      return Assignment;
    } catch (error) {
      throw error;
    }
  }

    async remove(id: string): Promise<void> {
      const user = await this.findOne(id);
      await user?.destroy();
    }
}

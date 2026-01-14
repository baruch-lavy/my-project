import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './entities/shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftService {
  constructor(
    @InjectModel(Shift)
    private shiftModel: typeof Shift,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    try {
      return await this.shiftModel.create(createShiftDto as any);
    } catch (err) {
      throw new BadRequestException(err.message, 'ERROR!');
    }
  }

  async findAll(): Promise<Shift[] | string> {
    try {
      const shifts = await this.shiftModel.findAll();
      if (!shifts.length) return 'there is no shifts';
      return shifts;
    } catch (error) {
      throw new BadRequestException(error.message, 'ERROR!');
    }
  }

  async findOne(id: string): Promise<Shift | null> {
    try {
      const shift = await this.shiftModel.findOne({
        where: {
          id,
        },
      });
      if (!shift) throw new BadRequestException();
      return shift;
    } catch (error) {
      throw error;
    }
  }

    async remove(id: string): Promise<void> {
      const user = await this.findOne(id);
      await user?.destroy();
    }
}

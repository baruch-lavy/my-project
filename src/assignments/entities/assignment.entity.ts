import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Shift } from '../../shifts/entities/shift.entity';

@Table({ tableName: 'assignments', timestamps: true })
export class Assignment extends Model<Assignment> {
  declare id: string;

  declare createdAt: Date;
  declare updatedAt: Date;

  @ForeignKey(() => User) 
  @Column({
    type : DataType.INTEGER
  }) 
  declare userId: number
  
  
  @ForeignKey(() => Shift) 
  @Column({
    type: DataType.INTEGER,
  })
  declare shiftId: number;
}
 
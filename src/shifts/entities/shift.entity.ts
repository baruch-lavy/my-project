import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'shifts', timestamps: true })
export class Shift extends Model<Shift> {
  declare id: string;

  declare createdAt: Date;
  declare updatedAt: Date;

  @Column({
    type: DataType.DATE,
  })
  declare startTime: string;

  @Column({
    type: DataType.DATE,
  })
  declare endTime: string;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;
}

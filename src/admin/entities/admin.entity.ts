import { Model, Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin', timestamps: true })
export class Admin extends Model<Admin> {
  @Column({
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_verified: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_creator: boolean;
}

import { Model, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "admin", timestamps: true })
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
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_verified: boolean;

}

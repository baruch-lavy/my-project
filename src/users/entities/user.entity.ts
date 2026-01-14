import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: true })
export class User extends Model<User> {
 declare id: string;

  declare createdAt: Date;
  declare updatedAt: Date;
  
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
 declare role: string;

}

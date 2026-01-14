import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "MySecretNestKey",
      signOptions: {
        expiresIn : 30000000
      },
    }),
  ],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}

import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { adminSelfGuard } from "../auth/admin.self.guard";
import { creatorGuard } from "../auth/creator.guard";
import { AdminService } from "./admin.service";


@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {
  }

  @Get()
  @UseGuards(creatorGuard)
  async getAll() {
    return await this.adminService.findAll();
  }


  @Get("/:id")
  @UseGuards(adminSelfGuard)
  async getOne(@Param("id") id : string) {
    return await this.adminService.findOne(+id);
  }

  @Delete("/:id")
  @UseGuards(creatorGuard)
  async deleteAdmin(@Param("id") id : string) {
    return await this.adminService.delete(+id);
  }
}

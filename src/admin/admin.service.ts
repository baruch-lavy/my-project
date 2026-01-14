import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { errorHandler } from "../app/catchError";
import { createAdminDto } from "./dto/adminRegister.dto";
import { Admin } from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepository: typeof Admin) {}

  async createAdmin(createAdminDto: createAdminDto): Promise<Admin | undefined> {
    try {
      return await this.adminRepository.create(createAdminDto as any);
    } catch (e) {
      errorHandler(e);
    }
  }

  async findAll(): Promise<Admin[] | undefined> {
    try {
      return await this.adminRepository.findAll();
    } catch (e) {
      errorHandler(e);
    }
  }

  async findOne(id: number): Promise<Admin | null | undefined> {
    try {
      return await this.adminRepository.findByPk(id);
    } catch (e) {
      errorHandler(e);
    }
  }

  async delete(id: number): Promise<number | undefined> {
    try {
      return await this.adminRepository.destroy({ where: { id } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async getByEmail(email: string) {
    try {
      return this.adminRepository.findOne({ where: { email } });
    } catch (e) {
      errorHandler(e);
    }
  }

  async verify(id: number) {
    try {
      await this.adminRepository.update(
        {
          is_verified: true,
        },
        { where: { id } }
      );
    } catch (e) {
      errorHandler(e);
    }
  }

  async creator() {
    try {
      await this.adminRepository.update(
        { is_verified: true},
        { where: { email: "abdusalomovdev@gmail.com" } }
      );
    } catch (e) {
      errorHandler(e);
    }
  }

}

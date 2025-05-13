import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    if (await this.findByWhere({ email: createAdminDto.email }))
      throw new ConflictException("Email already exists");
    if (await this.findByWhere({ phone: createAdminDto.phone }))
      throw new ConflictException("Phone already exists");

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password: await bcrypt.hash(createAdminDto.password, 7),
    });

    return {
      success: true,
      message: "Admin successfully added",
      newAdminId: newAdmin.id,
    };
  }

  async findAll() {
    const allAdmins = await this.adminModel.findAll();
    if (allAdmins.length === 0) throw new NotFoundException("Admins not found");

    return { success: true, allAdmins };
  }

  async findByWhere(where: object) {
    return this.adminModel.findOne({ where: { ...where } });
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) throw new NotFoundException("Admin not found");

    return { success: true, admin };
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    admin.admin.update(updateAdminDto);

    return { success: true, updatedAdminId: id };
  }

  async (){}

  async remove(id: number) {
    const admin = await this.findOne(id);
    admin.admin.destroy();

    return { success: true, deletedAdminId: id };
  }

  
}

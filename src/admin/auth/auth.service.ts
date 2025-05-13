import { Injectable } from "@nestjs/common";
import { AdminService } from "../admin.service";

@Injectable()
export class AuthService {
  constructor(private readonly adminService: AdminService) {}

  async signInAdmin() {}
}

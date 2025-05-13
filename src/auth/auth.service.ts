import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { ValidationError } from "sequelize";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { Model } from "sequelize-typescript";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async generateToken(admin: Admin, res: Response) {
    const payload = {
      id: admin.id,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);

    await admin.update({
      hashed_refresh_token,
    });

    res.cookie("refresh_token", refreshToken);

    return { accessToken };
  }

  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByWhere({
      email: signInDto.email,
    });
    if (!admin) throw new BadRequestException("Email or password incorrect");
    if (!admin.is_active) throw new BadRequestException("Admin is not active");
    const validPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );
    if (!validPassword)
      throw new BadRequestException("Email or password incorrect");

    return {
      success: true,
      message: "Admin successfully signed in",
      accessToken: (await this.generateToken(admin, res)).accessToken,
    };
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    if (!adminData) throw new ForbiddenException("Admin not found");

    res.clearCookie("refresh_token");

    await (
      await this.adminService.findOne(adminData.id)
    ).admin.update({
      hashed_refresh_token: "",
    });

    return { success: true, message: "Admin successfully signed out" };
  }

  async refreshTokens(id: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (id !== decodedToken.id) throw new ForbiddenException("Forbidden");

    const { admin } = await this.adminService.findOne(id);
    if (!admin.hashed_refresh_token)
      throw new NotFoundException("User not found");

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token
    );
    if (!tokenMatch) throw new ForbiddenException("Forbidden");

    return {
      message: "User tokens refreshed",
      adminId: admin.id,
      accessToken: (await this.generateToken(admin, res)).accessToken,
    };
  }
  ƒ;
}

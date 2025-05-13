import { Body, Controller, Get, Param, Put, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorator/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("sign-in")
  async signInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Get("sign-out")
  async signOutAdmin(
    @Body() signInDto: SignInDto,
    @CookieGetter("refresh_token") refreshToken,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @Put("refresh-token/:id")
  async refreshTokens(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokens(+id, refreshToken, res);
  }
}

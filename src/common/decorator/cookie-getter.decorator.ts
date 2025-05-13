import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";

export const CookieGetter = createParamDecorator(
  async (data: string, context: ExecutionContext): Promise<string> => {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.cookies[data];

    if (!refreshToken) throw new UnauthorizedException("Token not found");

    return refreshToken;
  }
);

import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./admin/models/admin.model";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./admin/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    AdminModule,
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      models: [Admin],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

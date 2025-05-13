import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix("api");
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("So’rovnoma Project")
      .setDescription("Sorovnoma REST API")
      .setVersion("1.0")
      .addTag(
        "NestJs, swagger, sendMail, bot, SMS, tokens, Validation, Sequelize"
      )
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default function AddSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("1GLOBAL API")
    .setDescription("API device")
    .setVersion("0.0.1");

  if (process.env.NODE_ENV !== "production") {
    config.addTag("Development Environment");
  }

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup("swagger", app, document);
}
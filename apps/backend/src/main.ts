import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Sniffr API")
    .setDescription("The Sniffr API for dog matching and messaging")
    .setVersion("1.0")
    .addTag("dogs", "Dog management endpoints")
    .addTag("users", "User management endpoints")
    .addTag("matches", "Match management endpoints")
    .addTag("messages", "Message management endpoints")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

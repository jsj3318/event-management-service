import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AuthMiddleware} from "./middleware /auth.middleware";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(new AuthMiddleware().use);

  // 포트 설정
  const port = configService.get<number>('PORT') || 3200;
  await app.listen(port);
}
bootstrap();

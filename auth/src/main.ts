import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {GatewayAuthGuard} from "./middleware/gateway-auth.guard";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GatewayAuthGuard());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  const configService = app.get(ConfigService);

  // 포트 설정
  const port = configService.get<number>('PORT') || 3100;
  await app.listen(port);

}
bootstrap();

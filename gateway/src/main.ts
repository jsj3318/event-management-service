import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 스웨거
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 포트 설정
  const port = configService.get<number>('PORT') || 3200;
  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {GatewayAuthGuard} from "./middleware/gateway-auth.guard";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new GatewayAuthGuard());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // 스웨거
  const config = new DocumentBuilder()
      .setTitle('Event API')
      .setDescription('event 서버 API 명세')
      .setVersion('1.0')
      .addServer('http://localhost:3000')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  // 포트 설정
  const port = configService.get<number>('PORT') || 3200;
  await app.listen(port);

}
bootstrap();

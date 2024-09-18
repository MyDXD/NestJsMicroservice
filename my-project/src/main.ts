import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Then combine it with your microservice
  // const microservice = app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: { host: '0.0.0.0', port: 5000 },
  // });
  
  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

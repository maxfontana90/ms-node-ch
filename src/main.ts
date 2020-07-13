import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Add application root path to globals
import { resolve } from 'path';
global['appRoot'] = resolve(__dirname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

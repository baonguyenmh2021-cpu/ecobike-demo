import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '127.0.0.1');
}

void bootstrap().catch((error) => {
  console.error('Backend startup failed:', error.message);
  process.exitCode = 1;
});
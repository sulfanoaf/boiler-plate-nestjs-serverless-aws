import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv = require('dotenv');

const { parsed } = dotenv.config({
  path: `${process.cwd()}/.env`,
});
process.env = { ...parsed, ...process.env };

async function bootstrap(): Promise<void> {
  const nestApp = await NestFactory.create(AppModule);
  const basePath = process.env.BASE_PATH;
  if (basePath) {
    nestApp.setGlobalPrefix(basePath);
  }

  nestApp.enableCors();
  await nestApp.listen(process.env.APP_PORT);
}

bootstrap()
  .then(() => {
    console.info(`Server started at http://localhost:${process.env.APP_PORT}`);
  })
  .catch(err => {
    console.error('Cannot start server', err);
  });

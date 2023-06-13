import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CacheControlMiddleware } from './middlewares/cacheControl.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new CacheControlMiddleware().use)
  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();

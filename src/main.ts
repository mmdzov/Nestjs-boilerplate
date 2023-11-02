declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import configuration from './config/configuration';
import * as compression from 'compression';
import { VersionFallbackMiddleware } from './common/middlewares/version-fallback.middleware';

async function bootstrap() {
  const { http } = configuration();

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(compression());

  app.use(new VersionFallbackMiddleware().use);

  await app.listen(http.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

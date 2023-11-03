declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import configuration from './config/configuration';
import * as compression from 'compression';
import { VersionFallbackMiddleware } from './common/middlewares/version-fallback.middleware';
import { OpenAPI } from './config/openAPI';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const { http } = configuration();

  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(csurf());
  app.enableCors();
  app.use(compression());

  app.enableShutdownHooks();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(new VersionFallbackMiddleware().use);

  const openApi = new OpenAPI();

  openApi.create(app);

  await app.listen(http.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

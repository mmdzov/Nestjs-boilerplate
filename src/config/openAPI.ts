import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './configuration';

export interface IBuildDocument {
  app: INestApplication<any>;
  title: string;
  description: string;
  version: string;
  tags: string[];
  path: string;
}

export type TBuildDocumentKeys = keyof IBuildDocument;

export class BuildDocument {
  constructor(args: IBuildDocument) {
    const docBuilder = new DocumentBuilder()
      .setTitle(args.title)
      .setDescription(args.description)
      .setVersion(args.version);

    for (const i in args.tags) {
      const tag = args.tags[i];

      docBuilder.addTag(tag);
    }

    const config = docBuilder.build();

    const document = SwaggerModule.createDocument(args.app, config);

    console.log(args.path);
    SwaggerModule.setup(args.path, args.app, document);
  }
}

export class OpenAPI {
  create(app: IBuildDocument['app']) {
    const { docs } = configuration();

    if (!docs?.enable) return;

    for (const i in docs.versions) {
      const versionInstance = docs.versions[i];

      const getPriority = (key: TBuildDocumentKeys) =>
        this.getStringValueByPriority(versionInstance[key], docs[key]);

      const getArrayPriority = (key: TBuildDocumentKeys) =>
        this.getArrayValueByPriority(versionInstance[key], docs[key]);

      new BuildDocument({
        app: app,
        path: getPriority('path'),
        description: getPriority('description'),
        version: getPriority('version'),
        title: getPriority('title'),
        tags: getArrayPriority('tags'),
      });
    }
  }

  private getArrayValueByPriority(...values: string[][]) {
    for (const i in values) {
      const value = values[i];
      if (!value || value.length === 0) continue;

      return value;
    }

    return [];
  }

  private getStringValueByPriority(...values: string[]) {
    for (const i in values) {
      const value =
        typeof values[i] === 'number' ? values[i] : values[i]?.trim();

      if (!value) continue;

      return value;
    }

    return '';
  }
}

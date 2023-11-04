import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { mongoDBAddr } from './mongoose.config';

@Module({
  imports: [],
})
export class DatabaseModule {
  static register() {
    return {
      imports: [MongooseModule.forRoot(mongoDBAddr())],
      module: DatabaseModule,
      exports: [MongooseModule],
    };
  }

  static use(models?: ModelDefinition[], connectionName?: string) {
    return {
      imports: [MongooseModule.forFeature(models, connectionName)],
      module: DatabaseModule,
      exports: [MongooseModule],
    };
  }
}

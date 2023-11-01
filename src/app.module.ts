import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { mongoDBAddr } from './config/database.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(mongoDBAddr()), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

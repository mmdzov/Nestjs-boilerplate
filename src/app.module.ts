import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule.register(), UsersModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

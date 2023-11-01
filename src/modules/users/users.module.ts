import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllerV1 } from './users.controller.v1';

@Module({
  imports: [],
  controllers: [UsersControllerV1],
  providers: [UsersService],
})
export class UsersModule {}

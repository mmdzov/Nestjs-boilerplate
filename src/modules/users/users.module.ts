import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllerV1 } from './users.controller.v1';
import { UsersControllerV2 } from './users.controller.v2';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersControllerV1, UsersControllerV2],
  providers: [UsersService],
})
export class UsersModule {}

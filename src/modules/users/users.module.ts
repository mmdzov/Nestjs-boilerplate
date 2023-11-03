import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllerV1 } from './users.controller.v1';
import { UsersControllerV2 } from './users.controller.v2';
import { User, UserSchema } from 'src/schemas/users.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule.use([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersControllerV1, UsersControllerV2],
  providers: [UsersService],
})
export class UsersModule {}

import { ZodValidationPipe } from 'src/common/pipes/ZodValidation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { createUserSchema } from './schema/create.schema';

@Controller({
  version: '2',
  path: 'users',
})
export class UsersControllerV2 {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}

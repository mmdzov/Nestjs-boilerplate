import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersControllerV1 {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }
}

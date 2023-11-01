import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll() {
    return [
      {
        uid: 1,
      },
      {
        uid: 2,
      },
    ];
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const created = await this.userModel.create(createUserDto);

    return created;
  }
}

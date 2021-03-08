import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { findUserItemQuery } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUser: CreateUserDto) {
    this.userRepository.create(createUser);
    return this.userRepository.save(createUser);
  }

  findAll(): Promise<any> {
    return this.userRepository.find();
  }

  findOne(query: findUserItemQuery): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(query);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

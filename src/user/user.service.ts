import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private salt = 5;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);
    const createdUser = this.userRepository.create(data);
    await this.userRepository.save(createdUser);

    const token = await this.signIn(createdUser);
    return { token };
  }

  // async getOneUserAccount(userId: string) {}

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async signIn(user: User) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }
}

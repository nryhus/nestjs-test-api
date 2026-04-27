import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

import { AuthService } from '../auth/auth.service';
import { PaginatedDTO } from '../common/pagination/response';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import {
  UserCreateDto,
  UserLoginDto,
  UserLoginSocialDto,
} from './dto/user.dto';
import { PublicUserData } from './interface/user.interfacer';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

@Injectable()
export class UserService {
  private salt = 5;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(
    query: PublicUserInfoDto,
  ): Promise<PaginatedDTO<PublicUserData>> {
    return await this.userRepository.getAllUsers(query);
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

  async login(data: UserLoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user || !(await this.compareHash(data.password, user.password))) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.signIn(user);

    return { token };
  }

  async loginSocial(data: UserLoginSocialDto) {
    try {
      const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
      );

      const result = await oAuth2Client.verifyIdToken({
        idToken: data.accessToken,
      });

      const tokenPayload = result.getPayload();
      const findUser = await this.userRepository.findOne({
        where: { email: tokenPayload.email },
      });

      const token = await this.authService.signIn({
        id: findUser.id.toString(),
      });

      return { token };
    } catch {
      throw new HttpException('Google auth failed', HttpStatus.UNAUTHORIZED);
    }
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

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

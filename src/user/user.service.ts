import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];

  constructor() {}

  async getAllUsers() {
    return this.users;
  }

  async createUser(data) {
    // return this.users.push(data);
  }

  async getOneUserAccount(userId: string) {
    // return this.users.find(user => user.id === userId);
  }
}

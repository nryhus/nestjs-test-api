import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Car } from './car.entity';
import { CarCreateRequestDto } from './model/dto/request/car-create.request.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCar(data: CarCreateRequestDto) {
    const user = await this.userRepository.findOne({});
    return await this.carRepository.save(
      this.carRepository.create({ ...data, users: [user] }),
    );
  }
}

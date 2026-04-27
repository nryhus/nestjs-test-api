import { Injectable } from '@nestjs/common';
import { paginateRawAndEntities } from 'nestjs-typeorm-paginate';
import { DataSource, Repository } from 'typeorm';

import { PublicUserInfoDto } from '../common/query/user.query.dto';
import { PublicUserData } from './interface/user.interfacer';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async getAllUsers(query: PublicUserInfoDto) {
    query.sort = query.sort || 'user.id';
    query.order = query.order || 'ASC';

    const options = {
      page: query.page || 1,
      limit: query.limit || 2,
    };

    const queryBuilder = this.createQueryBuilder('user')
      .innerJoin('user.animals', 'ani')
      .select(['user.id', 'user.age', 'user.email', 'user.userName']);

    if (query.search) {
      queryBuilder.where('"userName" IN(:...search)', {
        search: query.search.split(','),
      });
    }

    if (query.class) {
      queryBuilder.andWhere(
        `LOWER(ani.class) LIKE '%${query.class.toLowerCase()}%'`,
      );
    }

    queryBuilder.orderBy(`${query.sort}`, query.order as 'ASC' | 'DESC');

    const [pagination, rawResults] = await paginateRawAndEntities(
      queryBuilder,
      options,
    );

    return {
      page: pagination.meta.currentPage,
      pages: pagination.meta.totalPages,
      countItem: pagination.meta.totalItems,
      entities: rawResults as [PublicUserData],
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import configuration from './configuration';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class PostgresqlConfigService {
  constructor(
    @Inject(configuration.KEY)
    private postgresqlConfiguration: ConfigType<typeof configuration>,
  ) {}

  get host(): string {
    return this.postgresqlConfiguration.host || 'localhost';
  }

  get port(): number {
    return Number(this.postgresqlConfiguration.port) || 5432;
  }

  get username(): string {
    return this.postgresqlConfiguration.user || 'user';
  }

  get password(): string {
    return this.postgresqlConfiguration.password || 'password';
  }

  get database(): string {
    return this.postgresqlConfiguration.database || 'db';
  }
}

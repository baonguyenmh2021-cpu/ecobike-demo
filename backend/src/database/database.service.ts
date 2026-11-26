import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';

import type { ConfigType } from '@nestjs/config';
import { Pool } from 'pg';
import type { QueryResultRow } from 'pg';
import databaseConfig from '../config/database.config';

@Injectable()
export class DatabaseService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(DatabaseService.name);
  private readonly pool: Pool;

  constructor(
    @Inject(databaseConfig.KEY)
    config: ConfigType<typeof databaseConfig>,
  ) {
    this.pool = new Pool(config);

    this.pool.on('error', (error) => {
      this.logger.error(error.message);
    });
  }

  async onModuleInit() {
    await this.pool.query('SELECT 1');
    this.logger.log('PostgreSQL connected successfully');
  }

  query<T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params: unknown[] = [],
  ) {
    return this.pool.query<T>(sql, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
import {
  Controller,
  Get,
  ServiceUnavailableException,
} from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  check() {
    return {
      status: 'UP',
      application: 'EcoBike Backend',
    };
  }

  @Get('database')
  async checkDatabase() {
    try {
      const result = await this.db.query(`
        SELECT
          current_database() AS database,
          (
            SELECT COUNT(*)::int
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_type = 'BASE TABLE'
          ) AS total_tables,
          (
            SELECT COUNT(*)::int
            FROM public.products
          ) AS total_products
      `);

      return {
        status: 'UP',
        application: 'EcoBike Backend',
        database: result.rows[0],
        timestamp: new Date().toISOString(),
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'DOWN',
        message: 'Database check failed',
      });
    }
  }
}
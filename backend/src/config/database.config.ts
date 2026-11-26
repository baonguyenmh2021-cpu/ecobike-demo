import { registerAs } from '@nestjs/config';
import type { PoolConfig } from 'pg';

export default registerAs('database', (): PoolConfig => {
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD is required');
  }

  const port = Number(process.env.DB_PORT ?? 5432);
  const max = Number(process.env.DB_POOL_MAX ?? 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid DB_PORT');
  }

  if (!Number.isInteger(max) || max < 1) {
    throw new Error('Invalid DB_POOL_MAX');
  }

  return {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port,
    database: process.env.DB_NAME ?? 'ecobike_db',
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD,
    max,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  };
});
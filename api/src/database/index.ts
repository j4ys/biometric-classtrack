import { ConnectionOptions } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
const dbConnection: ConnectionOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [env === 'production' ? 'build/entity/*{.ts,.js}' : 'src/entity/*{.ts,.js}'],
  migrations: [env === 'production' ? 'build/migration/*{.ts,.js}' : 'src/migration/*{.ts,.js}'],
  subscribers: [env === 'production' ? 'build/subscriber/*{.ts,.js}' : 'src/subscriber/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export { dbConnection };

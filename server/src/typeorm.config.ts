import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();
export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  autoLoadEntities: true,
  synchronize: true,
};

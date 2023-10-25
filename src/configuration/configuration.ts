import { registerAs } from '@nestjs/config';

import dotenv = require('dotenv');

const { parsed } = dotenv.config({
  path: process.cwd() + '/.env',
});
process.env = { ...parsed, ...process.env };

interface IConfiguration {
  type: string;
  database: string;
  host: string;
  username: string;
  password: string;
  port: number;
  logging: boolean;
  synchronize: boolean;
}

export default registerAs('boilerPlate', async (): Promise<IConfiguration> => {
  const source = process.env;

  return {
    type: 'mysql',
    database: source.TYPEORM_DATABASE,
    host: source.TYPEORM_HOST,
    username: source.TYPEORM_USERNAME,
    password: source.TYPEORM_PASSWORD,
    port: parseInt(source.TYPEORM_PORT),
    logging: Boolean(source.TYPEORM_LOGGING),
    synchronize: false,
  };
});

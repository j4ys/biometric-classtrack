import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    MYSQL_HOST: str(),
    MYSQL_PORT: port(),
    MYSQL_USERNAME: str(),
    MYSQL_PASSWORD: str(),
    MYSQL_DATABASE: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;

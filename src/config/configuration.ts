import { ConfigModule } from '@nestjs/config';

export interface EnvVariables {
  DB_TYPE: any;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

const ConfigurationModule = ConfigModule.forRoot({
  isGlobal: true,
});

export default ConfigurationModule;

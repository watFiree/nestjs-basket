import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ItemEntity } from '../items/items.entity';
import { BasketEntity } from '../core/basket.entity';
import { EnvVariables } from './configuration';

const DBModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService<EnvVariables>) => ({
    type: configService.get<any>('DB_TYPE'),
    host: configService.get('DB_HOST', { infer: true }),
    port: configService.get('DB_PORT', { infer: true }),
    username: configService.get('DB_USERNAME', { infer: true }),
    password: configService.get('DB_PASSWORD', { infer: true }),
    database: configService.get<any>('DB_NAME'),
    entities: [ItemEntity, BasketEntity],
    ssl: true,
    synchronize: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
});

export default DBModule;

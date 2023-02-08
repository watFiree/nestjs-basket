import { Module } from '@nestjs/common';
import DBModule from './config/database';
import ConfigurationModule from './config/configuration';
import { ItemsModule } from './items/items.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigurationModule, DBModule, CoreModule, ItemsModule],
  controllers: [],
  providers: [],
  exports: []
})
export class BasketModule {};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import DBModule from './config/database';
import ConfigurationModule from './config/configuration';

@Module({
  imports: [ConfigurationModule, DBModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
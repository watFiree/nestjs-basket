import { Module } from '@nestjs/common';
import DBModule from '../config/database';
import ConfigurationModule from '../config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BasketInterceptor } from './core.interceptor';
import { BasketEntity } from './basket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketProvider } from './basket.provider';


@Module({
  imports: [ConfigurationModule, DBModule, TypeOrmModule.forFeature([BasketEntity])],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: BasketInterceptor, 
  },
  BasketProvider,
  ],
  exports: [BasketProvider]
})
export class CoreModule {};

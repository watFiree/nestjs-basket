import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { BasketEntity } from './basket.entity';
import { basketIdFieldName } from './core.constants';

@Injectable({ scope: Scope.REQUEST })
export class BasketProvider {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(BasketEntity)
    private basketsRepository: Repository<BasketEntity>,
  ) {}

  getBasketId(): BasketId {
    return this.request.cookies[basketIdFieldName];
  }

  async getCurrentEntity(relations: string[] = []) {
    const currentBasketId = this.getBasketId();
    const currentBasketRepository = await this.basketsRepository.findOne({ where: { basketId: currentBasketId }, relations });
  
    return currentBasketRepository;
  }

  getBasketsRepository() {
    return this.basketsRepository;
  }
}

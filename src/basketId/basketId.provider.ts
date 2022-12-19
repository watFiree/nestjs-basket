import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { basketIdFieldName } from './basketId.constants';

@Injectable({ scope: Scope.REQUEST })
export class BasketIdProvider {
  constructor(@Inject(REQUEST) private request: Request) {}

  get(): BasketId {
    return this.request.cookies[basketIdFieldName];
  }
}

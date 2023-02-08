import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { translate } from '../translations';
import { generateBasketId } from './core.helpers';
import { basketIdFieldName } from './core.constants';
import { BasketEntity } from './basket.entity';

@Injectable()
export class BasketInterceptor implements NestInterceptor {
  constructor(@InjectRepository(BasketEntity) private readonly basketsRepository: Repository<BasketEntity>) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const hasBasketId = request.cookies[basketIdFieldName];

    if (!hasBasketId) {
      const newBasketId = generateBasketId();
      try {
        await this.basketsRepository.save({ basketId: newBasketId, items: null })
      } catch (error) {
        return of({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            error?.message || translate("basketInterceptor.serverError"),
        });
      }

      request.cookies[basketIdFieldName] = newBasketId;
      response.cookie(basketIdFieldName, newBasketId);
    }

    if (hasBasketId || request.method === 'POST') {
      // we can continue with new created basketId on POST
      return next.handle();
    }

    return of({
      statusCode: HttpStatus.BAD_REQUEST,
      message:
      translate("basketInterceptor.missingBasketId"),
    });
  }
}

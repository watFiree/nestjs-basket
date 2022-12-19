import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { generateBasketId } from './basketId.generate';
import { basketIdFieldName } from './basketId.constants';

@Injectable()
export class BasketIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const hasBasketId =
      request.headers[basketIdFieldName] || request.cookies[basketIdFieldName];

    if (!hasBasketId) {
      const newBasketId = generateBasketId();
      request.cookies[basketIdFieldName] = newBasketId;
      response.cookie(basketIdFieldName, newBasketId);
    }

    console.log(request.cookies);

    if (hasBasketId || request.method === 'POST') {
      // we can continue with new created basketId on POST
      return next.handle();
    }

    return of({
      statusCode: HttpStatus.BAD_REQUEST,
      message:
        'Missing basketId, the new one was created and added to cookies.',
    });
  }
}

import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { Item } from './items.entity';
import { BasketIdProvider } from '../basketId/basketId.provider';

@Injectable()
export class ItemsService {
  private items: ItemDto[];

  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @Inject(BasketIdProvider)
    private basketIdProvider: BasketIdProvider,
  ) {
    this.items = [];
  }

  getBasketItems() {
    return this.items;
  }

  addItemToBasket(item: ItemDto) {
    const isItemInBasket = this.items.find(
      (basketItem) => basketItem.productId === item.productId,
    );

    console.log('token', this.basketIdProvider.get());

    if (isItemInBasket) {
      throw new HttpException(
        'Item already added to basket',
        HttpStatus.CONFLICT,
      );
    }

    const newItem: Item = {
      ...item,
      basketId: this.basketIdProvider.get(),
    };

    return this.itemsRepository.save(newItem);
  }

  updateBasketItem(item: ItemDto) {
    this.items = this.items.map((basketItem) =>
      basketItem.productId === item.productId ? item : basketItem,
    );

    return this.items;
  }

  patchBasketItem(itemNewData: Partial<ItemDto>) {
    this.items = this.items.map((basketItem) =>
      basketItem.productId === itemNewData.productId
        ? { ...basketItem, ...itemNewData }
        : basketItem,
    );

    return this.items;
  }

  deleteBasketItem(productId: ProductId) {
    this.items = this.items.filter(
      (basketItem) => basketItem.productId !== productId,
    );

    return this.items;
  }
}

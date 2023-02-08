import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { ItemEntity } from './items.entity';
import { BasketProvider } from '../core/basket.provider';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
    @Inject(BasketProvider)
    private basketProvider: BasketProvider,
  ) {
  }

  async getBasketItems() {
    try {
      const currentBasket = await this.basketProvider.getCurrentEntity();

      return await this.itemsRepository.find({ where: { basket: currentBasket } });
    } catch (error) {
      return error;
    }
  }

  async addItemToBasket(item: ItemDto) {
    try {

      const currentBasket = await this.basketProvider.getCurrentEntity([
        'items',
      ])
      const isItemInBasket = await this.itemsRepository.findOneBy({ basket: currentBasket, productId: item.productId });
      
      if (isItemInBasket) {
        throw new HttpException(
          'Item already added to basket',
          HttpStatus.CONFLICT,
          );
        }
        
        const newItem = new ItemEntity();
        newItem.productId = item.productId;
        newItem.count = item.count;
        newItem.price = item.price;
        newItem.currency = item.currency;
        
        currentBasket.items = [...(currentBasket.items || []), newItem]
        newItem.basket = currentBasket;
        
        await this.itemsRepository.save(newItem);
        
        const basketRepository = await this.basketProvider.getBasketsRepository();
        
        await basketRepository.save(currentBasket);
        
        // return currentBasket.items;
      } catch (error) {
        console.log(error)
        return error;
      }
  }

  updateBasketItem(item: ItemDto) {

  }

  patchBasketItem(itemNewData: Partial<ItemDto>) {
    // this.items = this.items.map((basketItem) =>
    //   basketItem.productId === itemNewData.productId
    //     ? { ...basketItem, ...itemNewData }
    //     : basketItem,
    // );

    // return this.items;
  }

  deleteBasketItem(productId: ProductId) {
    // this.items = this.items.filter(
    //   (basketItem) => basketItem.productId !== productId,
    // );

    // return this.items;
  }
}

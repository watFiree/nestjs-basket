import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getBasketItems() {
    return this.itemsService.getBasketItems();
  }

  @Post()
  addItemToBasket(@Body() item: ItemDto) {
    return this.itemsService.addItemToBasket(item);
  }

  @Put()
  updateBasketItem(@Body() item: ItemDto) {
    return this.itemsService.updateBasketItem(item);
  }

  @Patch()
  patchBasketItem(@Body() itemNewData: Partial<ItemDto>) {
    return this.itemsService.patchBasketItem(itemNewData);
  }

  @Delete(':productId')
  deleteBasketItem(@Param('productId') productId: ProductId) {
    console.log(productId);
    return this.itemsService.deleteBasketItem(productId);
  }
}

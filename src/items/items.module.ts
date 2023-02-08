import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemEntity } from './items.entity';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), CoreModule],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

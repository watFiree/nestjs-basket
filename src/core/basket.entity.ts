import { ItemEntity } from '../items/items.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({name: 'baskets'})
export class BasketEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  basketId: BasketId;

  @OneToMany(() => ItemEntity, item => item.basket, { cascade: true })
  items: Array<ItemEntity>;
}

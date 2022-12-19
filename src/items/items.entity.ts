import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  basketProductId?: number;

  @Column()
  basketId: string;

  @Column()
  productId: ProductId;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column({ default: 'PLN' })
  currency?: Currency;
}

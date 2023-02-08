import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BasketEntity } from 'src/core/basket.entity';

@Entity({ name: 'items' })
export class ItemEntity {
  @PrimaryGeneratedColumn()
  basketProductId?: number;

  @ManyToOne(() => BasketEntity, basket => basket.items)
  basket: BasketEntity;

  @Column()
  productId: ProductId;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column({ default: 'PLN' })
  currency?: Currency;
}

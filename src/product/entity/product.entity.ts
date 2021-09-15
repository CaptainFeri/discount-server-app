import { DiscountEntity } from 'src/discount/entity/discount.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { parrentCatEntity } from './parrentCat.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DiscountEntity , (disconnect) => disconnect.discount_product_id)
  discounts: DiscountEntity[];
  
  @ManyToOne(() => parrentCatEntity, (cat) => cat.childer, { eager: true })
  parrentCat: parrentCatEntity;
  
  @Column()
  productName: string;

  @Column()
  price: number;
}

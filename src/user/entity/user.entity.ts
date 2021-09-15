import { DiscountEntity } from 'src/discount/entity/discount.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  mobile: string;

  @ManyToMany(() => DiscountEntity, (discount) => discount.discount_user_id, {
    eager: true,
  })
  
  @JoinTable()
  discounts: DiscountEntity[];
}

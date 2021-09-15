import { ProductEntity } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'discounts'})
export class DiscountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> ProductEntity , (product) => product.discounts)
    discount_product_id: number;

    @ManyToMany(() => UserEntity, (usr) => usr.discounts, {eager: true})
    discount_user_id: UserEntity[];

    @Column()
    discount_percent: number;

    @Column()
    discount_event: string;
}
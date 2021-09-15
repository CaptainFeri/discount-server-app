import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productName: string;

    @Column()
    discounts: string[];

    @Column()
    parentCat: string;

    @Column()
    mainCat: string;
}
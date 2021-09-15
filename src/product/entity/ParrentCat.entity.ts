import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MainCatEntity } from "./mainCat.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'parrentCats'})
export class parrentCatEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ProductEntity, (product) => product.parentCat)
    childer: ProductEntity[];
    
    @Column()
    category_name: string;
    
    @ManyToOne(() => MainCatEntity, (mom) => mom.children, { eager: true})
    mainCat : MainCatEntity;

}
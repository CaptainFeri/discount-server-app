import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { parrentCatEntity } from "./parrentCat.entity";

@Entity({ name: 'mainCats'})
export class MainCatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    main_cat_name: string;

    @OneToMany(() => parrentCatEntity, (cat) => cat.id)
    children: parrentCatEntity[];
}
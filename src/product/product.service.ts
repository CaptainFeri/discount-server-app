import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountService } from 'src/discount/discount.service';
import { DiscountEntity } from 'src/discount/entity/discount.entity';
import { ResponseModel } from 'src/types/ResponseModel';
import { UserEntity } from 'src/user/entity/user.entity';
import { createConnection, QueryBuilder, Repository } from 'typeorm';
import { ProductDto } from './dto/ProductDto.dto';
import { MainCatEntity } from './entity/mainCat.entity';
import { parrentCatEntity } from './entity/parrentCat.entity';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(parrentCatEntity)
    private readonly catRepository: Repository<parrentCatEntity>,
    @InjectRepository(MainCatEntity)
    private readonly McatRepository: Repository<MainCatEntity>,
  ) {}

  async createProduct(product: ProductDto): Promise<ProductEntity> {
    const newProd = new ProductEntity();
    newProd.price = product.price;
    newProd.productName = product.productName;
    const cat = await this.catRepository.findOne({
      category_name: product.category,
    });
    if (!cat) {
      if (product.mother) {
        newProd.parrentCat = await this.createParrentCategory(
          product.category,
          product.mother,
        );
      }
    }
    return newProd;
  }

  async getProductByName(name: string): Promise<ProductEntity> {
    return await this.productRepository.findOne({ productName: name});
  }

  async createParrentCategory(
    catname: string,
    mother: string,
  ): Promise<parrentCatEntity> {
    const cat = await this.catRepository.findOne({ category_name: catname });
    if (!cat) {
      const newCat = new parrentCatEntity();
      newCat.category_name = catname;
      const haveMother = await this.McatRepository.findOne({
        main_cat_name: mother,
      });
      if (haveMother) {
        newCat.mainCat = haveMother;
      } else {
        const newMom = new MainCatEntity();
        newMom.main_cat_name = mother;
        newMom.children.push(newCat);
        newCat.mainCat = newMom;
        await this.McatRepository.save(newMom);
        await this.catRepository.save(newCat);
        return newCat;
      }
    }
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }
}

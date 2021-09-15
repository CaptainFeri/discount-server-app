import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseModel } from 'src/types/ResponseModel';
import { Repository } from 'typeorm';
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

  async createProduct(product: ProductDto): Promise<ResponseModel> {
    const newProd = new ProductEntity();
    newProd.price = product.price;
    newProd.productName = product.productName;
    const allCats = this.catRepository.find();
    let isNew = false;
    (await allCats).forEach((el) => {
      if (el.category_name === product.category) {
        newProd.parrentCat = el;
        isNew = true;
      }
    });
    if (isNew) {
      const resp = new ResponseModel();
      resp.status = HttpStatus.BAD_REQUEST;
      resp.messages.push('this category not exist');
      resp.data = newProd;
      return resp;
    } else {
      const resp = new ResponseModel();
      resp.status = HttpStatus.BAD_REQUEST;
      resp.messages.push('this category not exist');
      resp.data = newProd;
      this.productRepository.save(newProd);
      return resp;
    }
  }

  async createParrentCategory(
    catname: string,
    mother: string,
  ): Promise<ResponseModel> {
    const cats = await this.catRepository.find();
    cats.forEach((el) => {
      if (el.category_name == catname) {
        const resp = new ResponseModel();
        resp.status = HttpStatus.BAD_REQUEST;
        resp.messages.push('this category is exist!');
        resp.data = el;
        return resp;
      }
    });
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
      const resp = new ResponseModel();
      resp.status = HttpStatus.OK;
      resp.messages.push('this category created');
      resp.data = newCat;
      return resp;
    }
  }

  async addProductToCategory(): Promise<ResponseModel> {
    return null;
  }
}

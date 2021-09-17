import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { ProductEntity } from 'src/product/entity/product.entity';
import { ResponseModel } from 'src/types/ResponseModel';
import { UserEntity } from 'src/user/entity/user.entity';
import { Like, Repository } from 'typeorm';
import { DiscountDto } from './dto/DiscountDto.dto';
import { DiscountEntity } from './entity/discount.entity';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(DiscountEntity)
    private readonly discountRepository: Repository<DiscountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createDiscount(discountDto: DiscountDto): Promise<DiscountEntity> {
    const newDiscount = new DiscountEntity();
    newDiscount.discount_percent = discountDto.discount_percrnt;
    const product = await this.productRepository.findOne({
      id: discountDto.discount_product_id,
    });
    newDiscount.discount_event = discountDto.discount_event;
    const user = await this.userRepository.findOne({
      id: discountDto.discount_user_id,
    });
    if (user) {
      newDiscount.discount_user_id.push(user);
      if (product) {
        newDiscount.discount_product_id = product.id;
        await this.discountRepository.insert(newDiscount);
        return newDiscount;
      }
    }
    return null;
  }

  async getAllDiscounts(): Promise<DiscountEntity[]> {
    const discounts = await this.discountRepository.find();
    return discounts;
  }

  async getDiscountByEvent(event: string): Promise<DiscountEntity[]> {
    const discounts = await this.discountRepository.find({
      discount_event: event,
    });
    return discounts;
  }

  async getDiscountByProductName(prodName: string): Promise<DiscountEntity[]> {
    const product = await this.productRepository.findOne({
      productName: prodName,
    });
    if (product) {
      const discounts = await this.discountRepository.find({
        discount_product_id: product.id,
      });
      return discounts;
    }
    return null;
  }

  async getDiscountForUser(username: string): Promise<DiscountEntity[]> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      const discounts = await this.discountRepository.find({
        discount_user_id: user.discounts,
      });
      return discounts;
    }
    return null;
  }

  async modifyPercentOfDiscount(percent: number, discountUserName: string,discountProductName: string): Promise<DiscountEntity> {
    const user = await this.userRepository.findOne({ username: discountUserName});
    const product = await this.productRepository.findOne({ productName: discountProductName})  
    const discount = await this.discountRepository.findOne({ discount_user_id : user.discounts , discount_product_id: product.id});
    if(user){
        if(product){
        }if(discount){
            discount.discount_percent = percent;
            return discount;
        }
    }
    return null;
  }

  
}

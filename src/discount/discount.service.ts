import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/product.entity';
import { ResponseModel } from 'src/types/ResponseModel';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
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

    async createDiscountForProduct(discount: DiscountDto): Promise<ResponseModel> {
        const newDis = new DiscountEntity();
        const user = await this.userRepository.findOne({ id: discount.discount_user_id});
        const product = await this.productRepository.find({ id: discount.discount_product_id});
        if (!user || !product) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.BAD_REQUEST;
            resp.messages.push('user or product not exist!');
            resp.data = newDis;
            return resp;
        }else {
            newDis.discount_event = discount.discount_event;
            newDis.discount_user_id.push(user);
            newDis.discount_product_id = discount.discount_product_id;
            newDis.discount_percent = discount.discount_percrnt;
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('new discount created!');
            resp.data = newDis;
            return resp;
        }
    }


}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { DiscountEntity } from './entity/discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscountEntity,UserEntity,ProductEntity])],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class DiscountModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/discount/entity/discount.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { MainCatEntity } from './entity/mainCat.entity';
import { parrentCatEntity } from './entity/parrentCat.entity';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity,MainCatEntity,parrentCatEntity,UserEntity,DiscountEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

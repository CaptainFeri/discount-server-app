import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCatEntity } from './entity/mainCat.entity';
import { parrentCatEntity } from './entity/parrentCat.entity';
import { ProductEntity } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity,MainCatEntity,parrentCatEntity])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

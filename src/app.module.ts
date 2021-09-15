import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import ormconfig from './ormconfig';
import { DiscountModule } from './discount/discount.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ProductModule,DiscountModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

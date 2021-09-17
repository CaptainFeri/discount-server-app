import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseModel } from 'src/types/ResponseModel';
import { ProductDto } from './dto/ProductDto.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}
    @Get()
    async getAllProducts(): Promise<ResponseModel> {
        const products = await this.productService.getAllProducts();
        const resp = new ResponseModel();
        resp.status = HttpStatus.OK;
        resp.messages.push('all products');
        resp.data = products;
        return resp;
    }
    @Get('/:product')
    async getProductByName(@Param('product') productName: string): Promise<ResponseModel> {
        const product = await this.productService.getProductByName(productName);
        if(product) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('product found');
            resp.data = product;
            return resp;
        }
        const resp = new ResponseModel();
        resp.status = HttpStatus.NOT_FOUND;
        resp.messages.push('product not found');
        resp.data = productName;
        return resp;
    }
    @Post('/create-product')
    async createProduct(@Body('product') product: ProductDto): Promise<ResponseModel> {
        const newProduct = await this.productService.createProduct(product);
        if(newProduct) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.CREATED;
            resp.messages.push('product created');
            resp.data = newProduct;
            return resp;
        }
        const resp = new ResponseModel();
        resp.status = HttpStatus.NOT_ACCEPTABLE;
        resp.messages.push('product found have structure');
        resp.data = product;
        return resp;
    }
    @Post('/create-parrent-category')
    async createParrentCategory(@Body('catName') catName: string,@Body('mother') mother: string): Promise<ResponseModel> {
        const cat = await this.productService.createParrentCategory(catName,mother);
        if(cat) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.CREATED;
            resp.messages.push('category created');
            resp.data = cat;
            return resp;
        }
        const resp = new ResponseModel();
        resp.status = HttpStatus.NOT_IMPLEMENTED;
        resp.messages.push('not created!');
        resp.data = {catName,mother};
        return resp;
    }
}

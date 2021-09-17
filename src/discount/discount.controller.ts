import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ResponseModel } from 'src/types/ResponseModel';
import { DiscountService } from './discount.service';
import { DiscountDto } from './dto/DiscountDto.dto';

@Controller('discount')
export class DiscountController {
    constructor(
        private readonly discountService: DiscountService,
    ) {}
    @Get('/all')
    async getAllDiscounts(): Promise<ResponseModel> {
        const discounts = await this.discountService.getAllDiscounts();
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('all discounts');
            resp.data = discounts;
            return resp;
    }
    @Get('/:product')
    async getDiscountsByProductName(@Param('product') product: string): Promise<ResponseModel> {
        const discount = await this.discountService.getDiscountByProductName(product);
        if(discount) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('discount found!');
            resp.data = discount;
            return resp;
        }
    }
    @Get('/:event')
    async getDiscountsByEvent(@Param('event') event: string): Promise<ResponseModel> {
        const discount = await this.discountService.getDiscountByEvent(event);
        if(discount) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('discount found!');
            resp.data = discount;
            return resp;
        }
    }
    @Get('/:username')
    async getDiscountsByUserName(@Param('username') username: string): Promise<ResponseModel> {
        const discount = await this.discountService.getDiscountForUser(username);
        if(discount) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('discount found!');
            resp.data = discount;
            return resp;
        }
    }
    @Post('/create-discount')
    async createDiscount(@Body('discount') discount: DiscountDto): Promise<ResponseModel> {
        const newDiscount = await this.discountService.createDiscount(discount);
        if(newDiscount) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.CREATED;
            resp.messages.push('new Discount created');
            resp.data = newDiscount;
            return resp;
        }
    }
    @Post('/modify-discount-percent')
    async modifyDicsountPercent(@Body('percent') percent: number, @Body('username') username: string, @Body('product') product: string): Promise<ResponseModel> {
        const discount = await this.discountService.modifyPercentOfDiscount(percent,username,product);
        if(discount) {
            const resp = new ResponseModel();
            resp.status = HttpStatus.OK;
            resp.messages.push('discount percent changed');
            resp.data = discount;
            return resp;
        }
    }

}

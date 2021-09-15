import { HttpStatus } from "@nestjs/common";

export class ResponseModel {
    status: HttpStatus;
    messages: string[];
    data: {};
}
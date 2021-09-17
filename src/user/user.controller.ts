import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { resolve } from 'path';
import { iif } from 'rxjs';
import { ResponseModel } from 'src/types/ResponseModel';
import { DeleteUserDto } from './dto/DeleteUerDto.dto';
import { UpdateMobileUserDto } from './dto/UpdateMobileUserDto.dto';
import { UpdateUserNameDto } from './dto/UpdateUserNameDto.dto';
import { UserDto } from './dto/UserDto.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  async getAllUsers(): Promise<ResponseModel> {
    const users = this.userService.getAllUsers();
    const resp = new ResponseModel();
    resp.status = HttpStatus.OK;
    resp.messages.push('all users');
    resp.data = users;
    return resp;
  }
  @Get('/mobile/:mobile')
  async getUserByMobile(
    @Param('mobile') mobile: string,
  ): Promise<ResponseModel> {
    const user = await this.userService.getUserByMobile(mobile);
    if (user) {
      const resp = new ResponseModel();
      resp.status = HttpStatus.OK;
      resp.messages.push(`${mobile} is found!`);
      resp.data = user;
      return resp;
    }
    const resp = new ResponseModel();
    resp.status = HttpStatus.NOT_FOUND;
    resp.messages.push('user by this mobile is not exist');
    resp.data = mobile;
    return resp;
  }
  @Get('/username/:username')
  async getUserByUserName(
    @Param('username') username: string,
  ): Promise<ResponseModel> {
    const user = this.userService.getUserByUserName(username);
    if (user) {
      const resp = new ResponseModel();
      resp.status = HttpStatus.OK;
      resp.messages.push(`${username} is found!`);
      resp.data = user;
      return resp;
    }
    const resp = new ResponseModel();
    resp.status = HttpStatus.NOT_FOUND;
    resp.messages.push(`not found with ${username}.`);
    resp.data = username;
    return resp;
  }
  @Post('/new')
  async createUser(@Body('user') user: UserDto): Promise<ResponseModel> {
    const newUser = await this.userService.createUser(user);
    if (newUser) {
      const resp = new ResponseModel();
      resp.status = HttpStatus.OK;
      resp.messages.push(
        `new User Added With ${user.username} & ${user.mobile}.`,
      );
      resp.data = newUser;
      return resp;
    }
    const resp = new ResponseModel();
    resp.status = HttpStatus.NOT_ACCEPTABLE;
    resp.messages.push('some thing went wrong');
    resp.data = user;
    return resp;
  }
  @Post('/update-user-name/:update')
  async updateUserName(
    @Param('update') update: string,
    @Body('newName') newName: string,
  ): Promise<ResponseModel> {
    const updateUserNameDto: UpdateUserNameDto = {
      existUserName: update,
      newUserName: newName,
    };
    const existUser = await this.userService.getUserByUserName(update);
    if (existUser) {
      const updateUser = await this.userService.updateUserName(
        updateUserNameDto,
      );
      if (updateUser) {
        const resp = new ResponseModel();
        resp.status = HttpStatus.OK;
        resp.messages.push(`${existUser} is updated to ${updateUser}.`);
        resp.data = { lastuser: existUser, updateUser: updateUser };
        return resp;
      }
    }
    const resp = new ResponseModel();
    resp.status = HttpStatus.NOT_ACCEPTABLE;
    resp.messages.push('not trust!');
    resp.data = updateUserNameDto;
    return resp;
  }
  @Post('/update-mobile/:update')
  async updateMobile(
    @Param('update') update: string,
    @Body('mobile') mobile: string,
  ): Promise<ResponseModel> {
    const updateMobileUserDto: UpdateMobileUserDto = {
      username: update,
      mobile: mobile,
    };
    const existUser = await this.userService.getUserByUserName(update);
    if (existUser) {
      const updateUser = await this.userService.updateMobile(
        updateMobileUserDto,
      );
      if (updateUser) {
        const resp = new ResponseModel();
        resp.status = HttpStatus.OK;
        resp.messages.push(`${existUser} is updated to ${updateUser}.`);
        resp.data = { lastuser: existUser, updateUser: updateUser };
        return resp;
      }
    }
    const resp = new ResponseModel();
    resp.status = HttpStatus.NOT_ACCEPTABLE;
    resp.messages.push('not trust!');
    resp.data = updateMobileUserDto;
    return resp;
  }
  @Delete('/delete/:username')
  async deleteUser(
    @Param('username') username: string,
    @Body('mobile') mobile: string,
  ): Promise<ResponseModel> {
    const deleteUserDto: DeleteUserDto = {
      mobile,
      username,
    };
    const userDeleted = await this.userService.deleteUser(deleteUserDto);
    if(userDeleted) {
        const resp = new ResponseModel();
        resp.status = HttpStatus.OK;
        resp.messages.push(`user ${userDeleted} is deleted!`);
        resp.data = userDeleted;
        return resp;
    }
    const resp = new ResponseModel();
        resp.status = HttpStatus.NOT_ACCEPTABLE;
        resp.messages.push(`user ${username} is Not found!`);
        resp.data = deleteUserDto;
        return resp;
  }
}

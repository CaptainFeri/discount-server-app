import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from 'src/discount/entity/discount.entity';
import { Repository } from 'typeorm';
import { DeleteUserDto } from './dto/DeleteUerDto.dto';
import { UpdateMobileUserDto } from './dto/UpdateMobileUserDto.dto';
import { UpdateUserNameDto } from './dto/UpdateUserNameDto.dto';
import { UserDto } from './dto/UserDto.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userDtp: UserDto): Promise<UserEntity> {
        const newUser = new UserEntity();
        newUser.username = userDtp.username;
        newUser.mobile = userDtp.mobile;
        try{
            this.userRepository.insert(newUser);
            return newUser;
        }catch(e) {
            return null;
        }
    }

    async updateMobile(updateUserDto: UpdateMobileUserDto): Promise<UserEntity> {
        if(updateUserDto.username) {
            try{
                const user = await this.userRepository.findOne({ username: updateUserDto.username});
                if(updateUserDto.mobile) {
                    user.mobile = updateUserDto.mobile;
                    await this.userRepository.save(user);
                    return user;
                }
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    async updateUserName(updateUserNameDto: UpdateUserNameDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ username: updateUserNameDto.existUserName});
        if(user) {
            user.username = updateUserNameDto.newUserName;
            this.userRepository.save(user);
            return user;
        }
        return null;
    }

    async deleteUser(deleteUserDto: DeleteUserDto): Promise<UserEntity> {
        const { username,mobile} = deleteUserDto;
        const user = await this.userRepository.findOne({ username,mobile});
        if(user) {
            this.userRepository.delete(user);
            return user;
        }
        return null;
    }

    async getUserByUserName(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({username}).catch(null);
    }

    async getUserByMobile(mobile: string): Promise<UserEntity> {
        return await this.userRepository.findOne({mobile}).catch(null);
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
}

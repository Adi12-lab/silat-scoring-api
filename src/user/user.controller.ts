import {
  Controller,
  Get,
  UseGuards,
  Post,
  Delete,
  Req,
  Body,
  Param,
} from '@nestjs/common';
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { UserDto } from './user.dto';

@Controller('user')
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all() {
    return await this.userService.allUser();
  }

  @Post()
  async create(@Req() request: Request, @Body() payload: UserDto) {
    return await this.userService.createUserWithoutRegister(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}

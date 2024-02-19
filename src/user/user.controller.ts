import { Controller, Get, UseGuards } from '@nestjs/common';
// import { Role as RoleEnum } from 'constants';
import { Role as RoleEnum } from '@prisma/client';
// import { Role as RoleEnum } from 'src/constant';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { JwtGuard } from 'src/auth/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
@Role(RoleEnum.ADMIN)
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async all() {
    return await this.userService.allUser();
  }
}

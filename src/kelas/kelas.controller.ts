import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { KelasService } from './kelas.service';
import { KelasDto } from './kelas.dto';

import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('kelas')
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class KelasController {
  constructor(private kelasService: KelasService) {}

  @Post()
  async create(@Body() payload: KelasDto) {
    return await this.kelasService.create(payload);
  }

  @Get()
  async all() {
    return await this.kelasService.all();
  }
}

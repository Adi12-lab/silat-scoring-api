import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

import { PertandinganService } from './pertandingan.service';
import { PertandinganDto } from './pertandingan.dto';

@Controller('pertandingan')
@UseGuards(JwtGuard, RoleGuard)
export class PertandinganController {
  constructor(private pertandinganService: PertandinganService) {}

  @Role([RoleEnum.ADMIN])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: PertandinganDto) {
    //ambil id pengawas
    return await this.pertandinganService.create(payload);
  }

  @Role([RoleEnum.ADMIN, RoleEnum.JURI])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Query('kegiatan') kegiatan: string) {
    return await this.pertandinganService.all(kegiatan);
  }

  @Role([RoleEnum.ADMIN])
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.pertandinganService.find(id);
  }

  @Role([RoleEnum.ADMIN])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: PertandinganDto) {
    // console.log(id);
    return await this.pertandinganService.update(id, payload);
  }

  @Role([RoleEnum.ADMIN])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.pertandinganService.delete(id);
  }
}

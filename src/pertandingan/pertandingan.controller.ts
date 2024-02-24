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
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class PertandinganController {
  constructor(private pertandinganService: PertandinganService) {}

  @Post()
  async create(@Body() payload: PertandinganDto) {
    //ambil id pengawas
    return await this.pertandinganService.create(payload);
  }

  @Get()
  async all(@Query('kegiatan') kegiatan: string) {
    return await this.pertandinganService.all(kegiatan);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: PertandinganDto) {
    // console.log(id);
    return await this.pertandinganService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.pertandinganService.delete(id);
  }
}

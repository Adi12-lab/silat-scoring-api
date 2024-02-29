import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { KegiatanService } from './kegiatan.service';
import { KegiatanDto } from './kegiatan.dto';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';

@Controller('kegiatan')
export class KegiatanController {
  constructor(private kegiatanService: KegiatanService) {}

  @Role([RoleEnum.JURI])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: KegiatanDto) {
    return await this.kegiatanService.create(payload);
  }

  @Role([RoleEnum.ADMIN, RoleEnum.JURI])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all() {
    return await this.kegiatanService.all();
  }
}

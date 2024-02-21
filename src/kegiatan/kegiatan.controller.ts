import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { KegiatanService } from './kegiatan.service';
import { KegiatanDto } from './kegiatan.dto';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';

@Controller('kegiatan')
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class KegiatanController {
  constructor(private kegiatanService: KegiatanService) {}

  @Post()
  async create(@Body() payload: KegiatanDto) {
    return await this.kegiatanService.create(payload);
  }

  @Get()
  async all() {
    return await this.kegiatanService.all();
  }
}

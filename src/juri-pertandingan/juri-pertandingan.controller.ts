import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { JuriPertandinganService } from './juri-pertandingan.service';
import { JuriPertandinganDto } from './juri-pertandingan.dto';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';

@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
@Controller('juri-pertandingan')
export class JuriPertandinganController {
  constructor(private juriPertandinganService: JuriPertandinganService) {}

  @Post()
  async create(@Body() payload: JuriPertandinganDto) {
    return await this.juriPertandinganService.create(payload);
  }

  @Get()
  async all(@Query('pertandingan') pertandingan: number) {
    return await this.juriPertandinganService.allByPertandingan(pertandingan);
  }
}

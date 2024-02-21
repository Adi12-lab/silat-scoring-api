import {
  Controller,
  Req,
  Body,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { Role as RoleEnum } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

import { PertandinganService } from './pertandingan.service';
import { PertandinganDto } from './pertandingan.dto';

@Controller('pertandingan')
@Role([RoleEnum.PENGAWAS])
@UseGuards(JwtGuard, RoleGuard)
export class PertandinganController {
  constructor(
    private pertandinganService: PertandinganService,
    // private prisma: PrismaService,
  ) {}

  @Post()
  async create(@Req() req: Request, @Body() payload: PertandinganDto) {
    //ambil id pengawas
    return await this.pertandinganService.create(
      payload,
      req['user'].kegiatan_id,
    );
  }

  @Get()
  async all(@Req() req: Request) {
    return await this.pertandinganService.all(req['user'].kegiatan_id);
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

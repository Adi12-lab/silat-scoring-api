import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { KategoriService } from './kategori.service';
import { KategoriDto } from './kategori.dto';

import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('kategori')
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class KategoriController {
  constructor(private kategoriService: KategoriService) {}

  @Post()
  async create(@Body() payload: KategoriDto) {
    return await this.kategoriService.create(payload);
  }

  @Get()
  async all() {
    return await this.kategoriService.all();
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.kategoriService.delete(id);
  }
}

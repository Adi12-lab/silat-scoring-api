import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { PesertaService } from './peserta.service';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { UseGuards } from '@nestjs/common';
import { PesertaDto } from './peserta.dto';
import { Request } from 'express';

@Controller('peserta')
@Role([RoleEnum.PENGAWAS])
@UseGuards(JwtGuard, RoleGuard)
export class PesertaController {
  constructor(private persertaService: PesertaService) {}

  @Post()
  async create(@Req() req: Request, @Body() payload: PesertaDto) {
    // console.log(pengawas);
    return await this.persertaService.create(payload, req['user'].kegiatan_id);
  }

  @Get()
  async all(@Req() req: Request) {
    return await this.persertaService.allByKegiatanPengawas(
      req['user'].kegiatan_id,
    );
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: PesertaDto) {
    return await this.persertaService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.persertaService.delete(id);
  }
}

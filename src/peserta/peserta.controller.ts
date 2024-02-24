import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Role as RoleEnum } from '@prisma/client';
import { PesertaService } from './peserta.service';
import { Role } from 'src/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';
import { UseGuards } from '@nestjs/common';
import { PesertaDto } from './peserta.dto';

@Controller('peserta')
@Role([RoleEnum.ADMIN])
@UseGuards(JwtGuard, RoleGuard)
export class PesertaController {
  constructor(private persertaService: PesertaService) {}

  @Post()
  async create(@Body() payload: PesertaDto) {
    // console.log(pengawas);
    return await this.persertaService.create(payload);
  }

  @Get()
  async all(@Query('kegiatan') kegiatan: string) {
    return await this.persertaService.allByKegiatan(kegiatan);
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

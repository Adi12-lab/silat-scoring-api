import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BabakService } from './babak.service';
import { BabakDto } from './babak.dto';
import { Role } from 'src/role/role.decorator';
import { Role as RoleEnum } from '@prisma/client';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('babak')
export class BabakController {
  constructor(private babakService: BabakService) {}

  @Role([RoleEnum.PENGAWAS])
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async create(@Body() payload: BabakDto) {
    return await this.babakService.create(payload);
  }

  @Role([RoleEnum.PENGAWAS, RoleEnum.JURI])
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async all(@Query('pertandingan') pertandingan: number) {
    return await this.babakService.getByPertandinganId(pertandingan);
  }

  @Role([RoleEnum.PENGAWAS])
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: BabakDto) {
    return await this.babakService.update(id, payload);
  }

  @Role([RoleEnum.PENGAWAS])
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.babakService.delete(id);
  }
}

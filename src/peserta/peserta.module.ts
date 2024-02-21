import { Module } from '@nestjs/common';
import { PesertaController } from './peserta.controller';
import { PesertaService } from './peserta.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PesertaController],
  providers: [PesertaService, PrismaService, JwtService],
})
export class PesertaModule {}

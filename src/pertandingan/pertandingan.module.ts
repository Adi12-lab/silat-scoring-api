import { Module } from '@nestjs/common';
import { PertandinganController } from './pertandingan.controller';
import { PertandinganService } from './pertandingan.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PertandinganController],
  providers: [PertandinganService, PrismaService, JwtService],
})
export class PertandinganModule {}

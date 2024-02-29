import { Module } from '@nestjs/common';
import { JuriPertandinganService } from './juri-pertandingan.service';
import { JuriPertandinganController } from './juri-pertandingan.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [JuriPertandinganService, PrismaService, JwtService],
  controllers: [JuriPertandinganController],
})
export class JuriPertandinganModule {}

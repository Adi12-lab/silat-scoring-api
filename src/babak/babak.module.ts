import { Module } from '@nestjs/common';
import { BabakService } from './babak.service';
import { BabakController } from './babak.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [BabakService, PrismaService, JwtService],
  controllers: [BabakController],
})
export class BabakModule {}

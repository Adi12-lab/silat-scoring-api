import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KelasDto } from './kelas.dto';

@Injectable()
export class KelasService {
  constructor(private prisma: PrismaService) {}
  async create(payload: KelasDto) {
    const kelas = await this.prisma.kelas.create({
      data: {
        ...payload,
      },
    });
    return kelas;
  }

  async all() {
    return await this.prisma.kelas.findMany();
  }
}

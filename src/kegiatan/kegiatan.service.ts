import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KegiatanDto } from './kegiatan.dto';

@Injectable()
export class KegiatanService {
  constructor(private prisma: PrismaService) {}

  async create(payload: KegiatanDto) {
    const kegiatan = await this.prisma.kegiatan.create({
      data: {
        ...payload,
      },
    });
    return kegiatan;
  }

  async all() {
    return await this.prisma.kegiatan.findMany();
  }

  async edit(id: string, payload: KegiatanDto) {
    const kegiatan = await this.prisma.kegiatan.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
    return kegiatan;
  }

  async delete(id: string) {
    return await this.prisma.kegiatan.delete({
      where: {
        id,
      },
    });
  }
}

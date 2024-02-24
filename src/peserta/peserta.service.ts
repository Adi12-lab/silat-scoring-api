import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PesertaDto } from './peserta.dto';

@Injectable()
export class PesertaService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PesertaDto) {
    const { kegiatan_id, ...restPayload } = payload;
    const peserta = await this.prisma.peserta.create({
      data: {
        ...restPayload,
        kegiatan: {
          connect: {
            id: kegiatan_id,
          },
        },
      },
    });
    return peserta;
  }

  async all() {
    const peserta = await this.prisma.peserta.findMany();
    return peserta;
  }

  async allByKegiatan(kegiatan_id: string) {
    const peserta = await this.prisma.peserta.findMany({
      where: {
        kegiatan: {
          id: kegiatan_id,
        },
      },
    });
    return peserta;
  }

  async update(peserta_id: string, payload: PesertaDto) {
    const peserta = await this.prisma.peserta.update({
      where: {
        id: peserta_id,
      },
      data: {
        ...payload,
      },
    });
    return peserta;
  }

  async delete(peserta_id) {
    return await this.prisma.peserta.delete({
      where: {
        id: peserta_id,
      },
    });
  }
}

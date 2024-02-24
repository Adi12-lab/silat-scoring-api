import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PertandinganDto } from './pertandingan.dto';

@Injectable()
export class PertandinganService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PertandinganDto) {
    const { sudut_biru_id, sudut_merah_id, tanggal, kegiatan_id } = payload;

    const sudut_biru_data = await this.prisma.peserta.findUnique({
      where: {
        id: sudut_biru_id,
      },
    });

    const sudut_merah_data = await this.prisma.peserta.findUnique({
      where: {
        id: sudut_merah_id,
      },
    });

    if (sudut_biru_data.kelas !== sudut_merah_data.kelas) {
      throw new BadRequestException('Peserta beda kelas');
    }

    if (sudut_biru_data.kegiatan_id !== sudut_merah_data.kegiatan_id) {
      throw new BadRequestException('Peserta beda kegiatan');
    }

    const pertandingan = await this.prisma.pertandingan.create({
      data: {
        tanggal,
        kegiatan: {
          connect: {
            id: kegiatan_id,
          },
        },
        sudut_biru: {
          connect: {
            id: sudut_biru_id,
          },
        },
        sudut_merah: {
          connect: {
            id: sudut_merah_id,
          },
        },
      },
    });
    return pertandingan;
  }

  async all(kegiatan_id: string) {
    return await this.prisma.pertandingan.findMany({
      where: {
        kegiatan: {
          id: kegiatan_id,
        },
      },
      include: {
        sudut_biru: true,
        sudut_merah: true,
      },
    });
  }

  async update(id: number, payload: PertandinganDto) {
    const { sudut_biru_id, sudut_merah_id, tanggal } = payload;

    const sudut_biru_data = await this.prisma.peserta.findUnique({
      where: {
        id: sudut_biru_id,
      },
    });

    const sudut_merah_data = await this.prisma.peserta.findUnique({
      where: {
        id: sudut_merah_id,
      },
    });

    if (sudut_biru_data.kelas !== sudut_merah_data.kelas) {
      throw new BadRequestException('Peserta beda kelas');
    }

    if (sudut_biru_data.kegiatan_id !== sudut_merah_data.kegiatan_id) {
      throw new BadRequestException('Peserta beda kegiatan');
    }

    return await this.prisma.pertandingan.update({
      where: {
        id,
      },
      data: {
        tanggal,
        sudut_biru: {
          connect: {
            id: sudut_biru_id,
          },
        },
        sudut_merah: {
          connect: {
            id: sudut_merah_id,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.pertandingan.delete({
      where: {
        id,
      },
    });
  }
}

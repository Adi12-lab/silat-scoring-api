import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PertandinganDto } from './pertandingan.dto';
import _ from 'underscore';

@Injectable()
export class PertandinganService {
  constructor(private prisma: PrismaService) {}

  async create(payload: PertandinganDto) {
    const { sudut_biru_id, sudut_merah_id, kegiatan_id, gelanggang } = payload;

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

    if (sudut_biru_data.kegiatan_id !== sudut_merah_data.kegiatan_id) {
      throw new BadRequestException('Peserta beda kegiatan');
    }

    if (sudut_biru_data.kategori_id !== sudut_merah_data.kategori_id) {
      throw new BadRequestException('Peserta beda kategori');
    }

    if (sudut_biru_data.kelas_id !== sudut_merah_data.kelas_id) {
      throw new BadRequestException('Peserta beda kelas');
    }
    const pertandingan = await this.prisma.pertandingan.create({
      data: {
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
        gelanggang,
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
    const pertandingan = await this.prisma.pertandingan.findMany({
      where: {
        kegiatan: {
          id: kegiatan_id,
        },
      },
      include: {
        sudut_biru: {
          include: {
            kategori: true,
            kelas: true,
          },
        },
        sudut_merah: true,
      },
    });
    const payload = pertandingan.map((ptd) => {
      const kategori = ptd.sudut_biru.kategori.nama;
      const kelas = ptd.sudut_biru.kelas.nama;
      const sudut_biru = _.omit(ptd.sudut_biru, 'kelas', 'kategori');
      return { ...ptd, sudut_biru, kategori, kelas };
    });
    return payload;
  }

  async find(id: number) {
    return await this.prisma.pertandingan.findUnique({
      where: {
        id,
      },
      include: {
        sudut_biru: true,
        sudut_merah: true,
      },
    });
  }

  async update(id: number, payload: PertandinganDto) {
    const { sudut_biru_id, sudut_merah_id } = payload;

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

    return await this.prisma.pertandingan.update({
      where: {
        id,
      },
      data: {
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

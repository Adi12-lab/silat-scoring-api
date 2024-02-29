import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JuriPertandinganDto } from './juri-pertandingan.dto';

@Injectable()
export class JuriPertandinganService {
  constructor(private prisma: PrismaService) {}

  async create(payload: JuriPertandinganDto) {
    return await this.prisma.juriOnPertandingan.create({
      data: {
        juri: {
          connect: {
            id: payload.juri_id,
          },
        },
        pertandingan: {
          connect: {
            id: payload.pertandingan_id,
          },
        },
      },
    });
  }

  async allByPertandingan(pertandingan_id: number) {
    return await this.prisma.juriOnPertandingan.findMany({
      where: {
        pertandingan_id,
      },
      include: {
        juri: true,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.juriOnPertandingan.delete({
      where: {
        id,
      },
    });
  }
}

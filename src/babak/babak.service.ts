import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BabakDto } from './babak.dto';

@Injectable()
export class BabakService {
  constructor(private prisma: PrismaService) {}

  async create(payload: BabakDto) {
    const { pertandingan_id, ...restPayload } = payload;
    const babak = await this.prisma.babak.create({
      data: {
        ...restPayload,
        pertandingan: {
          connect: {
            id: pertandingan_id,
          },
        },
      },
    });

    return babak;
  }

  async getByPertandinganId(pertandingan_id: number) {
    return await this.prisma.babak.findMany({
      where: {
        pertandingan_id,
      },
    });
  }

  async update(id: number, payload: BabakDto) {
    return await this.prisma.babak.update({
      where: {
        id,
      },
      data: {
        ...payload,
      },
    });
  }

  async delete(id: number) {
    const babak = await this.prisma.babak.findUnique({
      where: {
        id,
      },
    });

    if (babak.status === 'berjalan' || babak.status === 'jeda') {
      throw new BadRequestException(
        'Babak tidak bisa dihapus, mungkin sedang berjalan atau dijeda',
      );
    }

    return await this.prisma.babak.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KategoriDto } from './kategori.dto';

@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  async create(payload: KategoriDto) {
    const kategori = await this.prisma.kategori.create({
      data: {
        ...payload,
      },
    });
    return kategori;
  }

  async all() {
    return await this.prisma.kategori.findMany();
  }

  async delete(id: number) {
    return await this.prisma.kategori.delete({
      where: {
        id,
      },
    });
  }
}

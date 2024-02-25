import { IsString } from 'class-validator';

export class KategoriDto {
  @IsString({ message: 'nama Kategori harus ada' })
  nama: string;
}

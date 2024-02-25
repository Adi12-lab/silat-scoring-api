import { IsNumber, IsString } from 'class-validator';

export class PesertaDto {
  @IsString({ message: 'Nama harus ada' })
  nama: string;

  @IsString({ message: 'Perguruan harus ada' })
  perguruan: string;

  @IsString({ message: 'Daerah harus ada' })
  daerah: string;

  @IsNumber({}, { message: 'Kategori harus ada' })
  kategori_id: number;

  @IsNumber({}, { message: 'Kategori harus ada' })
  kelas_id: number;

  @IsString({ message: 'Kegiatan harus ada' })
  kegiatan_id: string;
}

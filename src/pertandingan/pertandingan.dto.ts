import { IsString } from 'class-validator';
export class PertandinganDto {
  @IsString({ message: 'Gelanggang diperlukan' })
  gelanggang: string;
  @IsString({ message: 'Kegiatan tidak valid' })
  kegiatan_id: string;
  @IsString({ message: 'Sudut merah harus ada' })
  sudut_merah_id: string;

  @IsString({ message: 'Sudut biru harus ada' })
  sudut_biru_id: string;
}

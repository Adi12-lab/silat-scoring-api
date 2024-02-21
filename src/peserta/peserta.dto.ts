import { IsEnum, IsString } from 'class-validator';
import { Kelas } from '@prisma/client';

export class PesertaDto {
  @IsString({ message: 'Nama harus ada' })
  nama: string;

  @IsString({ message: 'Perguruan harus ada' })
  perguruan: string;

  @IsString({ message: 'Daerah harus ada' })
  daerah: string;

  @IsEnum(Kelas)
  kelas: Kelas;
}

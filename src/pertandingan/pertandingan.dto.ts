import { Transform } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';
export class PertandinganDto {
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Tanggal tidak valid' })
  tanggal: Date;

  @IsString({ message: 'Sudut merah harus ada' })
  sudut_merah_id: string;

  @IsString({ message: 'Sudut biru harus ada' })
  sudut_biru_id: string;
}

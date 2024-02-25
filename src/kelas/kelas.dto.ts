import { IsString, IsNumber } from 'class-validator';

export class KelasDto {
  @IsString({ message: 'Nama kelas diperlukan' })
  nama: string;

  @IsNumber({}, { message: 'Berat badan tidak valid' })
  berat_badan: number;
}

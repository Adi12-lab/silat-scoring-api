import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
export class KegiatanDto {
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Tanggal tidak valid' })
  tanggal: Date;

  @IsString({ message: 'Nama diperlukan' })
  nama: string;
}

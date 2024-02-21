import { IsString } from 'class-validator';
export class KegiatanDto {
  @IsString({ message: 'Pengawas atau juri diperlukan' })
  user_id: string;

  @IsString({ message: 'Deskripsi diperlukan' })
  description: string;
}

import { IsNumber, IsString } from 'class-validator';
export class JuriPertandinganDto {
  @IsString({ message: 'Juri harus ada' })
  juri_id: string;

  @IsNumber({}, { message: 'Pertandingan harus ada' })
  pertandingan_id: number;
}

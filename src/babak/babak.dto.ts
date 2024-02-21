import { BabakStatus } from '@prisma/client';
import { IsNumber, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class BabakDto {
  @IsNumber({}, { message: 'Timer tidak valid' })
  timer: number;

  @IsNumber({}, { message: 'Pertandingan harus ada' })
  pertandingan_id: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Waktu mulai tidak valid' })
  waktu_mulai: Date;

  @IsOptional()
  @IsEnum(BabakStatus)
  status: BabakStatus;
}

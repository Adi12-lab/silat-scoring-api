import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Role as RoleEnum } from '@prisma/client';
export class UserDto {
  @IsString({ message: 'Username harus ada' })
  username: string;

  @IsString({ message: 'Password harus ada' })
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsOptional()
  @IsString({ message: 'Kegiatan tidak valid' })
  kegiatan_id: string;
}

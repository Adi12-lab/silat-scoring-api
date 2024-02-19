import { SetMetadata } from '@nestjs/common';

// import { Role as RoleEnum } from '../constant';
import { Role as RoleEnum } from '@prisma/client';

export const Role = (role: RoleEnum) => SetMetadata('ROLE', role);

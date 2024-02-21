import { Injectable, ConflictException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/auth.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: AuthDto) {
    const { username } = payload;

    const existingUser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    // console.log(existingUser)
    if (existingUser) throw new ConflictException('Username telah terpakai');

    const newUser = await this.prisma.user.create({
      data: {
        username,
        password: await hash(payload.password, 10),
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restNewUser } = newUser;
    return { restNewUser };
  }

  async allUser() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        kegiatan: {
          select: {
            id: true,
          },
        },
      },
    });
    return user;
  }
}

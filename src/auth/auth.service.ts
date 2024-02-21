import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthDto } from './auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(payload: AuthDto) {
    const user = await this.validateUser(payload);
    return user;
  }

  async validateUser(payload: AuthDto) {
    const user = await this.userService.findByUsername(payload.username);

    if (user && (await compare(payload.password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}

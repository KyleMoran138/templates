import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { validatePassword } from './passwordHelpers';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    identifier: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByIdentifier(identifier);
    if (user && validatePassword(pass, user.passwordHash, user.salt)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.identifier,
      sub: user.id,
      roles: ['user'],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

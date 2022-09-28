import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(identifier: string): Promise<User | undefined> {
    return this.users.find((user) => user.identifier === identifier);
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  private _users: User[] = [];

  constructor(private readonly prisma: PrismaService) {
    this._init();
  }

  private async _init() {
    this._users = await this.prisma.user.findMany({});
  }

  get users(): User[] {
    return this._users;
  }

  async findByIdentifier(identifier: string): Promise<User | undefined> {
    return this._users.find((user) => user.identifier === identifier);
  }

  async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });

    this._users.push(newUser);

    return newUser;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: user,
    });

    this._users = this._users.map((u) => (u.id === user.id ? updatedUser : u));

    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    this._users = this._users.filter((user) => user.id !== id);

    return deletedUser;
  }
}

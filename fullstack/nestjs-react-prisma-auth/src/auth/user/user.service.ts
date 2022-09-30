import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { hashAndSaltPassword } from '../passwordHelpers';

@Injectable()
export class UserService {
  private _users: User[] = [];

  constructor(private readonly prisma: PrismaService) {
    this._init();
  }

  private async _init() {
    this._users = await this.prisma.user.findMany({});
    if (process.env.NODE_ENV !== 'production') {
      const adminCreds = hashAndSaltPassword('admin');
      this._users.push({
        id: 1,
        identifier: 'admin',
        passwordHash: adminCreds.passwordHash,
        salt: adminCreds.salt,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  get users(): User[] {
    return this._users;
  }

  async findByIdentifier(identifier: string): Promise<User | undefined> {
    return this._users.find((user) => user.identifier === identifier);
  }

  async findById(id: number): Promise<User | undefined> {
    return this._users.find((user) => user.id === id);
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

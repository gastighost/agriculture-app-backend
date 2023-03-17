import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../services/auth/auth.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createUser(userData: Prisma.UserCreateInput) {
    const { username, email, password } = userData;

    const existingUser = await this.prismaService.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      throw new HttpException('Username or email has already been taken', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const savedUser = await this.prismaService.user.create({
      data: { username, email, password: hashedPassword },
    });

    delete savedUser.password;

    return savedUser;
  }

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new HttpException('User credentials invalid', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('User credentials invalid', 400);
    }

    const token = this.authService.generateJwtToken(user);

    return token;
  }
}

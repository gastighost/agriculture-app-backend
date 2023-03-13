import { Module } from '@nestjs/common';
import { AuthModule } from '../../services/auth/auth.module';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

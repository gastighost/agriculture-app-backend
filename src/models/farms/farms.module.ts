import { Module } from '@nestjs/common';
import { PrismaModule } from '../../services/prisma/prisma.module';
import { FarmsController } from './farms.controller';
import { FarmsService } from './farms.service';

@Module({
  imports: [PrismaModule],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}

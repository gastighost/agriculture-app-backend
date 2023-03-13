import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class FarmsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFarm(farmData: Prisma.FarmCreateInput) {
    return this.prismaService.farm.create({ data: farmData });
  }
}

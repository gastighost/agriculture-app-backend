import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class CropsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCrops(queryData: Prisma.CropWhereInput) {
    return this.prismaService.crop.findMany({ where: queryData });
  }

  async getCrop(id: string) {
    return this.prismaService.crop.findUnique({ where: { id } });
  }

  async createCrop(cropData: Prisma.CropCreateInput) {
    return this.prismaService.crop.create({ data: cropData });
  }

  async updateCrop(id: string, cropData: Prisma.CropUpdateInput) {
    return this.prismaService.crop.update({ where: { id }, data: cropData });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

type CropCreateInput = Omit<Prisma.CropCreateInput, 'farm'>;

@Injectable()
export class CropsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCrops(queryData: Prisma.CropWhereInput) {
    return this.prismaService.crop.findMany({ where: queryData });
  }

  async getCrop(id: string) {
    return this.prismaService.crop.findUnique({ where: { id } });
  }

  async createCrop(farmId: string, cropData: CropCreateInput) {
    return this.prismaService.crop.create({
      data: { ...cropData, farm: { connect: { id: farmId } } },
    });
  }

  async updateCrop(id: string, cropData: Prisma.CropUpdateInput) {
    return this.prismaService.crop.update({ where: { id }, data: cropData });
  }

  async deleteCrop(id: string) {
    return this.prismaService.crop.delete({ where: { id } });
  }
}

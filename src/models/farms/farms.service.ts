import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

type FarmCreateInput = Omit<Prisma.FarmCreateInput, 'user' | 'location'>;

@Injectable()
export class FarmsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllFarms(queryData: Prisma.FarmWhereInput) {
    return this.prismaService.farm.findMany({
      select: { name: true, areaSize: true, id: true, location: true },
      where: queryData,
    });
  }

  async getFarm(id: string) {
    return this.prismaService.farm.findUnique({ where: { id } });
  }

  async createFarm(
    locationId: string,
    userId: string,
    farmData: FarmCreateInput,
  ) {
    return this.prismaService.farm.create({
      data: {
        ...farmData,
        location: { connect: { id: locationId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async addFarmWeather(
    userId: string,
    farmId: string,
    weatherBody: Prisma.WeatherCreateInput,
  ) {
    const farm = await this.prismaService.farm.findUnique({
      where: { id: farmId },
    });

    if (userId !== farm.userId) {
      throw new HttpException(
        'You are not authorized to update this farm',
        403,
      );
    }

    return this.prismaService.farm.update({
      where: { id: farmId },
      data: { weather: { push: weatherBody } },
    });
  }

  async addFarmSoil(
    userId: string,
    farmId: string,
    soilBody: Prisma.SoilCreateInput,
  ) {
    const farm = await this.prismaService.farm.findUnique({
      where: { id: farmId },
    });

    if (userId !== farm.userId) {
      throw new HttpException(
        'You are not authorized to update this farm',
        403,
      );
    }

    return this.prismaService.farm.update({
      where: { id: farmId },
      data: { soil: { push: soilBody } },
    });
  }

  async updateFarm(
    userId: string,
    id: string,
    farmData: Prisma.FarmUpdateInput,
  ) {
    const farm = await this.prismaService.farm.findUnique({
      where: { id },
    });

    if (userId !== farm.userId) {
      throw new HttpException(
        'You are not authorized to update this farm',
        403,
      );
    }

    return this.prismaService.farm.update({ where: { id }, data: farmData });
  }
}

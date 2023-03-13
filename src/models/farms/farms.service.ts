import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class FarmsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFarm(farmData: Prisma.FarmCreateInput) {
    return this.prismaService.farm.create({ data: farmData });
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
}

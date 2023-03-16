import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

type MarketCreate = Omit<Prisma.MarketCreateInput, 'location' | 'crop'>;

@Injectable()
export class MarketsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMarket(cropId: string, marketData: MarketCreate) {
    const crop = await this.prismaService.crop.findUnique({
      where: { id: cropId },
      include: {
        farm: {
          include: {
            location: true,
          },
        },
      },
    });

    return this.prismaService.market.create({
      data: {
        ...marketData,
        location: { connect: { id: crop.farm.location.id } },
        crop: { connect: { id: crop.id } },
      },
    });
  }

  async getMarkets(queryData: Prisma.MarketWhereInput) {
    return this.prismaService.market.findMany({ where: queryData });
  }

  async getMarket(marketId: string) {
    return this.prismaService.market.findUnique({ where: { id: marketId } });
  }

  async updateMarket(marketId: string, marketData: Prisma.MarketUpdateInput) {
    return this.prismaService.market.update({
      where: { id: marketId },
      data: marketData,
    });
  }

  async deleteMarket(marketId: string) {
    return this.prismaService.market.delete({ where: { id: marketId } });
  }
}

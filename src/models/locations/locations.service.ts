import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLocation(locationData: Prisma.LocationCreateInput) {
    return this.prismaService.location.create({ data: locationData });
  }

  async getAllLocations(queryData: Prisma.LocationWhereInput) {
    return this.prismaService.location.findMany({ where: queryData });
  }

  async getLocation(id: string) {
    const existingLocation = await this.prismaService.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new HttpException('Location with this id does not exist', 400);
    }

    return this.prismaService.location.findUnique({ where: { id } });
  }

  async updateLocation(id: string, locationData: Prisma.LocationUpdateInput) {
    const existingLocation = await this.prismaService.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new HttpException('Location with this id does not exist', 400);
    }

    return this.prismaService.location.update({
      where: { id },
      data: locationData,
    });
  }

  async deleteLocation(id: string) {
    const existingLocation = await this.prismaService.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new HttpException('Location with this id does not exist', 400);
    }

    return this.prismaService.location.delete({ where: { id } });
  }
}

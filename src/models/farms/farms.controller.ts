import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { AddWeatherDto } from './dto/add-weather.dto';
import { CreateFarmDto } from './dto/create-farm.dto';
import { FarmsService } from './farms.service';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':farmId/add-weather')
  async addFarmWeather(
    @Req() req,
    @Param('farmId') farmId: string,
    @Body() weatherBody: AddWeatherDto,
  ) {
    const { id: userId } = req.user;

    const farm = await this.farmsService.addFarmWeather(
      userId,
      farmId,
      weatherBody,
    );

    return { message: 'Farm weather successfully added!', farm };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':locationId')
  async createFarm(
    @Req() req,
    @Param('locationId') locationId: string,
    @Body() farmBody: CreateFarmDto,
  ) {
    const { id: userId } = req.user;

    const farm = await this.farmsService.createFarm({
      ...farmBody,
      location: { connect: { id: locationId } },
      user: { connect: { id: userId } },
    });

    return { message: 'Farm successfully created!', farm };
  }
}

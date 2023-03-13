import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { AddSoilDto } from './dto/add-soil.dto';
import { AddWeatherDto } from './dto/add-weather.dto';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmsService } from './farms.service';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllFarms() {
    const farms = await this.farmsService.getAllFarms();

    return { message: 'Farms successfully retrieved!', farms };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getFarm(@Param('id') id: string) {
    const farm = await this.farmsService.getFarm(id);

    return { message: 'Farm successfully retrieved!', farm };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':farmId')
  async updateFarm(
    @Req() req,
    @Param('farmId') farmId: string,
    @Body() farmBody: UpdateFarmDto,
  ) {
    const { id: userId } = req.user;

    const farm = await this.farmsService.updateFarm(userId, farmId, farmBody);

    return { message: 'Farm successfully updated!', farm };
  }

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
  @Patch(':farmId/add-soil')
  async addFarmSoil(
    @Req() req,
    @Param('farmId') farmId: string,
    @Body() soilBody: AddSoilDto,
  ) {
    const { id: userId } = req.user;

    const farm = await this.farmsService.addFarmSoil(userId, farmId, soilBody);

    return { message: 'Farm soil successfully added!', farm };
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

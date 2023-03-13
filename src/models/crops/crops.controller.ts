import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop-dto';
import { CropQueryDto } from './dto/crop-query.dto';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCrops(@Query() query: CropQueryDto) {
    const crops = await this.cropsService.getAllCrops(query);

    return { message: 'Crops successfully retrieved!', crops };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCrop(@Param('id') id: string) {
    const crop = await this.cropsService.getCrop(id);

    return { message: 'Crop successfully retrieved!', crop };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':farmId')
  async createCrop(
    @Param('farmId') farmId: string,
    @Body() cropBody: CreateCropDto,
  ) {
    const crop = await this.cropsService.createCrop({
      ...cropBody,
      farm: { connect: { id: farmId } },
    });

    return { message: 'Crop successfully created!', crop };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async createLocation(@Body() locationBody: CreateLocationDto) {
    const location = await this.locationsService.createLocation(locationBody);

    return { message: 'Location successfully created!', location };
  }

  @Get()
  async getAllLocations() {
    const locations = await this.locationsService.getAllLocations();

    return { message: 'Locations successfully retrieved!', locations };
  }

  @Get(':id')
  async getLocation(@Param('id') id: string) {
    const location = await this.locationsService.getLocation(id);

    return { message: 'Location successfully retrieved!', location };
  }

  @Patch(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() locationBody: UpdateLocationDto,
  ) {
    const updatedLocation = await this.locationsService.updateLocation(
      id,
      locationBody,
    );

    return { message: 'Location successfully updated!', updatedLocation };
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    const deletedLocation = await this.locationsService.deleteLocation(id);

    return { message: 'Location successfully deleted!', deletedLocation };
  }
}

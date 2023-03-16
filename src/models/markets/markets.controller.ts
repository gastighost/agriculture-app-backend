import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../services/auth/jwt-auth.guard';
import { CreateMarketDto } from './dto/create-market.dto';
import { QueryMarketDto } from './dto/query-market.dto';
import { UpdateMarketDto } from './dto/update-market.dto';
import { MarketsService } from './markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':cropId')
  async createMarket(
    @Param('cropId') cropId: string,
    @Body() body: CreateMarketDto,
  ) {
    const market = await this.marketsService.createMarket(cropId, body);

    return { message: 'Crop market was successfully created!', market };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMarkets(@Query() query: QueryMarketDto) {
    const markets = await this.marketsService.getMarkets(query);

    return { message: 'Markets successfully retrieved!', markets };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMarket(@Param('id') id: string) {
    const market = await this.marketsService.getMarket(id);

    return { message: 'Market successfully retrieved!', market };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMarket(
    @Param('id') id: string,
    @Body() marketBody: UpdateMarketDto,
  ) {
    const market = await this.marketsService.updateMarket(id, marketBody);

    return { message: 'Market successfully updated!', market };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteMarket(@Param('id') id: string) {
    const market = await this.marketsService.deleteMarket(id);

    return { message: 'Market successfully deleted', market };
  }
}

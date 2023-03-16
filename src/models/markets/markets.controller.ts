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
import { CreateMarketDto } from './dto/create-market.dto';
import { QueryMarketDto } from './dto/query-market.dto';
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
}

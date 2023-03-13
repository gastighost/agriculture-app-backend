import { Module } from '@nestjs/common';
import { PrismaModule } from './services/prisma/prisma.module';
import { LocationsModule } from './models/locations/locations.module';

@Module({
  imports: [PrismaModule, LocationsModule],
})
export class AppModule {}

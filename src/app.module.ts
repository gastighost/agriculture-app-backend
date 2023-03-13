import { Module } from '@nestjs/common';
import { PrismaModule } from './services/prisma/prisma.module';
import { LocationsModule } from './models/locations/locations.module';
import { FarmsModule } from './models/farms/farms.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CropsModule } from './models/crops/crops.module';

@Module({
  imports: [
    PrismaModule,
    LocationsModule,
    FarmsModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CropsModule,
  ],
})
export class AppModule {}

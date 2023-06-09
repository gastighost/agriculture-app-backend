import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './services/prisma/prisma.module';
import { LocationsModule } from './models/locations/locations.module';
import { FarmsModule } from './models/farms/farms.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { CropsModule } from './models/crops/crops.module';
import { MarketsModule } from './models/markets/markets.module';
import { WebsocketsModule } from './services/websockets/websockets.module';
import { TasksModule } from './services/tasks/tasks.module';

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
    MarketsModule,
    WebsocketsModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './services/prisma/prisma.module';
import { LocationsModule } from './models/locations/locations.module';
import { FarmsModule } from './models/farms/farms.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './services/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';
import { configValidationSchema } from './configs/configValidationSchema';
import { WeatherModule } from './weather/weather.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    WeatherModule,
    LocationsModule,
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}

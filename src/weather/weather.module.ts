import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherAPIService } from 'src/services/weatherAPI.service';
import { HttpClient } from 'src/common/httpClient';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherAPIService, HttpClient],
})
export class WeatherModule {}

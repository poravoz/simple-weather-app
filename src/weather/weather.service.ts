import { Injectable } from '@nestjs/common';
import { GetWeatherDTO } from './dto/getWeather.dto';
import { WeatherAPIService } from 'src/services/weatherAPI.service';
import { ApiResponse } from 'src/common/response.model';

@Injectable()
export class WeatherService {
  constructor(private readonly weatherAPIService: WeatherAPIService) {}

  async getWeather(data: GetWeatherDTO) {
    try {
      const query = `${data.lat},${data.long}`;
      const result = await this.weatherAPIService.getWeather(query);
      return new ApiResponse('Weather data retrieved successfully', 200, [result]);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return new ApiResponse('Failed to fetch weather data', 500, []);
    }
  }

  async getDefaultWeather() {
    try {
      const defaultLocation = { lat: 46.975033, long: 31.994583 }; // Миколаїв
      const query = `${defaultLocation.lat},${defaultLocation.long}`;
      const result = await this.weatherAPIService.getWeather(query);
      return new ApiResponse('Default weather data retrieved successfully', 200, [result]);
    } catch (error) {
      console.error('Error fetching default weather data:', error.message);
      return new ApiResponse('Failed to fetch default weather data', 500, []);
    }
  }
}



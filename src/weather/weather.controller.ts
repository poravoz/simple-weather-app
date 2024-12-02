import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDTO } from './dto/getWeather.dto';
import { ApiResponse } from 'src/common/response.model';

@Controller('weathers')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @HttpCode(200)
  async getWeather(@Query() data: GetWeatherDTO) {
    return await this.weatherService.getWeather(data);
  }

  @Get('simple')
  @HttpCode(200)
  async getDefaultWeather() {
    return await this.weatherService.getDefaultWeather();
  }

  @Post()
  @HttpCode(200)
  async getWeatherWithParams(@Body() data: GetWeatherDTO): Promise<ApiResponse<any>> {
    return await this.weatherService.getWeather(data);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from 'src/common/httpClient';

@Injectable()
export class WeatherAPIService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient,
  ) {}

  async getWeather(query: string) {
    const weatherAPIKey = this.configService.get('weatherAPIKey');
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${query}&days=3&aqi=yes&alerts=yes`;
    return await this.httpClient.get(url);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @Post()
  async addLocation(@Body() body: CreateLocationDTO) {
    return this.locationsService.addLocation(body);
  }

  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() body: UpdateLocationDTO,
  ) {
    return this.locationsService.updateLocation(id, body);
  }

  @Delete(':id')
  async deleteLocation(@Param('id') id: string) {
    return this.locationsService.deleteLocation(id);
  }
}

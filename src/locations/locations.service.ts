import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from './entities/location.entity';
import { ApiResponse } from 'src/common/response.model';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}

  async getAllLocations() {
    try {
      const locations = await this.locationRepository.find();
      return new ApiResponse('List of all locations', 200, locations);
    } catch (error) {
      console.error('Error fetching locations:', error.message);
      return new ApiResponse('Error fetching locations', 500, null);
    }
  }

  async addLocation(location: { name: string; lat: number; long: number }) {
    try {
      const newLocation = this.locationRepository.create(location);
      await this.locationRepository.save(newLocation);
      return new ApiResponse('Location added successfully', 201, newLocation);
    } catch (error) {
      console.error('Error adding location:', error.message);
      return new ApiResponse('Error adding location', 500, null);
    }
  }

  async updateLocation(id: string, location: { name: string; lat: number; long: number }) {
    try {
      const existingLocation = await this.locationRepository.findOne({ where: { id } });
      if (!existingLocation) {
        return new ApiResponse('Location not found', 404, null);
      }
      this.locationRepository.merge(existingLocation, location);
      await this.locationRepository.save(existingLocation);
      return new ApiResponse('Location updated successfully', 200, existingLocation);
    } catch (error) {
      console.error('Error updating location:', error.message);
      return new ApiResponse('Error updating location', 500, null);
    }
  }

  async deleteLocation(id: string) {
    try {
      const existingLocation = await this.locationRepository.findOne({ where: { id } });
      if (!existingLocation) {
        return new ApiResponse('Location not found', 404, null);
      }
      await this.locationRepository.remove(existingLocation);
      return new ApiResponse('Location deleted successfully', 200, existingLocation);
    } catch (error) {
      console.error('Error deleting location:', error.message);
      return new ApiResponse('Error deleting location', 500, null);
    }
  }
}

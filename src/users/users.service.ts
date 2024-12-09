import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/common/response.model';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.userRepository.find();
      return new ApiResponse('List of all users', 200, users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return new ApiResponse('Error fetching users', 500, null);
    }
  }

  async addUser(user: { name: string; email: string; password: string }) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });
    
      await this.userRepository.save(newUser);
      return new ApiResponse('User added successfully', 201, newUser);
    } catch (error) {
      console.error('Error adding user:', error.message);
      return new ApiResponse('Error adding user', 500, null);
    }
  }

  async updateUser(id: string, user: { name: string; email: string }) {
    try {
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        return new ApiResponse('User not found', 404, null);
      }
      this.userRepository.merge(existingUser, user); 
      await this.userRepository.save(existingUser); 
      return new ApiResponse('User updated successfully', 200, existingUser);
    } catch (error) {
      console.error('Error updating user:', error.message);
      return new ApiResponse('Error updating user', 500, null);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return new ApiResponse('User not found', 404, null);
      }
      await this.userRepository.remove(user);
      return new ApiResponse('User deleted successfully', 200, user);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return new ApiResponse('Error deleting user', 500, null);
    }
  }
}
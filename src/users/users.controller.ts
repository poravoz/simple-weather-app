import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  async addUser(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.addUser(body);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}

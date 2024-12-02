import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  message: string;
  statusCode: HttpStatus;
  data: T[];

  constructor(message: string, statusCode: HttpStatus, data: T[] = []) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

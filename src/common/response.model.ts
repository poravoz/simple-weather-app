export class ApiResponse<T> {
  constructor(
    public message: string,
    public statusCode: number,
    public data: T | T[]
  ) {}
}

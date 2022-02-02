export class InternalError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
    this.message = message;
  }
}
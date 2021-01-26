export class ResFormatter {
  statusCode: number;
  error: boolean;
  message: string | null;
  data: any;

  constructor(statusCode: number, error: boolean, message: string | null, data: any) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message || null;
    this.data = data || null;
  }
}

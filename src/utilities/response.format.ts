interface ResponseData {
  statusCode: number;
  error: boolean;
  message: string | null;
  data: any;
}

export default class ResFormatter {
  constructor(statusCode: number, error: boolean, message: string | null, data: any) {
    let responseData: ResponseData = { statusCode, error, message, data };
    return responseData;
  }

  static success(message: string | null, data: any): ResponseData {
    let responseData: ResponseData = { statusCode: 200, error: false, message, data };
    return responseData;
  }
}

export interface ApiError extends Error {
  statusCode: number;
  status: string;
}

export class SendError extends Error implements ApiError {
  statusCode: number;
  status: string;
  constructor(message: string, statuscode: number) {
    super(message);

    this.statusCode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "failed" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

import { NextResponse } from "next/server";

export class ApiResponse {
  static success<T>(data: T, message = "Success", status = 200) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status }
    );
  }

  static error(message = "Internal Server Error", status = 500, errors: any = null) {
    return NextResponse.json(
      {
        success: false,
        message,
        errors,
      },
      { status }
    );
  }

  static unauthorized(message = "Unauthorized") {
    return this.error(message, 401);
  }

  static forbidden(message = "Forbidden") {
    return this.error(message, 403);
  }

  static notFound(message = "Resource not found") {
    return this.error(message, 404);
  }

  static badRequest(message = "Bad request", errors: any = null) {
    return this.error(message, 400, errors);
  }
}

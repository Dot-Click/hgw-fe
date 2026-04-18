import { NextRequest, NextResponse } from "next/server";
import { AppError, ValidationError } from "./appError";
import { ZodError } from "zod";

type RouteHandler = (
  req: NextRequest,
  context: any
) => Promise<NextResponse> | NextResponse;

export const catchError = (handler: RouteHandler) => {
  return async (req: NextRequest, context: any): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error("Backend Error:", error);

      if (error instanceof AppError) {
        return NextResponse.json(
          {
            status: "error",
            message: error.message,
            ...(error instanceof ValidationError && { errors: error.errors }),
          },
          { status: error.statusCode }
        );
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            status: "fail",
            message: "Validation failed",
            errors: error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      // Default to 500 server error
      const isDev = process.env.NODE_ENV === "development";
      return NextResponse.json(
        {
          status: "error",
          message: "Internal Server Error",
          ...(isDev && { stack: error.stack, error: error.message }),
        },
        { status: 500 }
      );
    }
  };
};

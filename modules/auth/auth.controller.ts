import { NextRequest, NextResponse } from "next/server";
import { authService } from "./auth.service";
import { RegisterSchema } from "./auth.schema";
import { catchError } from "../shared/utils/errorHandler";

export class AuthController {
  static register = catchError(async (req: NextRequest) => {
    const body = await req.json();
    
    // Validation
    const validatedData = RegisterSchema.parse(body);
    
    // Business Logic
    const result = await authService.register(validatedData);
    
    return NextResponse.json({
      status: "success",
      data: result,
    });
  });

  static me = catchError(async (req: NextRequest) => {
    // This would be called by a protected route where session is available
    // For now, it's an example of how the controller interacts with services
    const userId = "placeholder-id"; 
    const user = await authService.getCurrentUser(userId);
    
    return NextResponse.json({
      status: "success",
      data: { user },
    });
  });
}

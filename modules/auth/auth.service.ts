import { userRepository } from "../user/user.repository";
import { AppError } from "../shared/utils/appError";
import { RegisterRequest } from "./auth.schema";

export class AuthService {
  async register(data: RegisterRequest) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("Email already in use", 400);
    }

    // BetterAuth handles password hashing if using its signUp method, 
    // but if we do custom creation, we'd handle it here.
    // For now, we'll keep it as a placeholder for business logic.
    return { message: "Auth logic ready" };
  }

  async getCurrentUser(uid: string) {
    const user = await userRepository.findById(uid);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export const authService = new AuthService();

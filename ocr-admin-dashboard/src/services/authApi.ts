import type { LoginResponse } from "../types";

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return {
      user: {
        id: "1",
        username: "admin",
        role: "admin",
      },
      token: "fake-jwt-token-12345",
    };
  }
  throw new Error("Invalid username or password");
}

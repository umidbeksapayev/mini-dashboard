import type { AuthResponse, LoginCredentials } from "@/entities/user/types";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (!credentials.email || !credentials.password) {
      throw new Error("Email va parol majburiy");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      token: "fake-jwt-token-" + Date.now(),
      user: {
        id: 1,
        name: "John Doe",
        email: credentials.email,
        username: credentials.email.split("@")[0],
      },
    };
  },

  register: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      token: "fake-jwt-token-" + Date.now(),
      user: {
        id: 1,
        name: credentials.email.split("@")[0],
        email: credentials.email,
        username: credentials.email.split("@")[0],
      },
    };
  },
};

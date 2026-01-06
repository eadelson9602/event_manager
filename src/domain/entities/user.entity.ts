export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}


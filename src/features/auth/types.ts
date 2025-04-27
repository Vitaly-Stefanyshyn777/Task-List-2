export interface User {
  email: string;
  uid: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

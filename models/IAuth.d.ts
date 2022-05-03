import { User } from "firebase/auth";

export interface IAuth {
  user: User | null,
  signUp: (email: string, password: string) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  logOut: () => Promise<void>,
  error: string | null,
  loading: boolean
}
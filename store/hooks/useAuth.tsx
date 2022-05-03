import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createUserWithEmailAndPassword, User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthProviderProps } from "../../models/AuthProviderProps";
import { IAuth } from "../../models/IAuth";

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  loading: false
});

// @ts-ignore
export const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() =>
    onAuthStateChanged(auth, (user) =>
    {
      if (user) {

        setUser(user);
        setLoading(false);
      } else {

        setUser(null);
        setLoading(false);
        router.push('/login');
      }
      setInitLoading(false);
    }), [auth])

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
        .then(credential => {
          setUser(credential.user);
          router.push('/');
          setLoading(false);
        })
        .catch(error => alert(error.message))
        .finally(() => setLoading(false));
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
        .then(credential => {
          setUser(credential.user);
          router.push('/');
          setLoading(false);
        })
        .catch(error => alert(error.message))
        .finally(() => setLoading(false));
  }

  const logOut = async () => {
    setLoading(true);

    await signOut(auth)
        .then(() => setUser(null))
        .catch(error => alert(error.message))
        .finally(() => setLoading(false))
  }

  const memoUser = useMemo(() => ({
    user, loading, signUp, signIn, logOut, error
  }), [user, loading]);

  // @ts-ignore
  return (<AuthContext.Provider value={memoUser}> {!initLoading && children} </AuthContext.Provider>)
}

export default function useAuth() {
  return useContext(AuthContext);
}

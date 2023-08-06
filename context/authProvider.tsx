import { useSegments, useRouter, useRootNavigation } from "expo-router";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config";

interface AuthContextValue {
  signIn: (e: string, p: string) => Promise<any>;
  signUp: (e: string, p: string, n: string) => Promise<any>;
  signOut: () => Promise<any>;
  user: any;
  authInitialized: boolean;
}

// Define the Provider component
interface ProviderProps {
  children: React.ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function Provider(props: ProviderProps) {
  const [user, setAuth] = useState(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // This hook will protect the route access based on user authentication.
  const useProtectedRoute = (user: any) => {
    const segments = useSegments();
    const router = useRouter();

    // checking that navigation is all good;
    const [isNavigationReady, setNavigationReady] = useState(false);
    const rootNavigation = useRootNavigation();

    useEffect(() => {
      const unsubscribe = rootNavigation?.addListener("state", (event) => {
        setNavigationReady(true);
      });
      return function cleanup() {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [rootNavigation]);

    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/login");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.

        router.push("/");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuth(user);
      setAuthInitialized(true);
    });
  }, []);

  const logout = async () => {
    return signOut(auth);
  };

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createAccount = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signOut: logout,
        signUp: createAccount,
        user,
        authInitialized,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return authContext;
};

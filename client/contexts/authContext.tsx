import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  id: string;
  email: string;
  username: string;
  bio: string;
  skills: string[];
  experience: string[];
  education: string[];
  profilePicture: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const verifyCookie = async () => {
    if (!cookies.token) {
      console.log("No token found, redirecting to login");
      router.push("/");
    }

    try {
      const response = await axios.get(
        "https://dynamic-profile.onrender.com/api/auth/verify-cookie",
        { withCredentials: true }
      );

      if (response.data.status) {
        // console.log(cookies, "cookies");
        login();
      } else {
        console.log("Token verification failed, redirecting to login");
        router.push("/");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  };

  useEffect(() => {
    verifyCookie();
  }, [cookies]);

  const login = async () => {
    try {
      // console.log(cookies);
      const response = await axios.get("https://dynamic-profile.onrender.com/api/profile/get-profile", {
        withCredentials: true,
      });
      // console.log(cookies, "After getUser request inside auth context");
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        console.log("User data not found!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = () => {
    const handleLogout = async () => {
      await axios.post("https://dynamic-profile.onrender.com/api/auth/logout");
    }
    handleLogout();
    setUser(null);
    removeCookie('token');
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

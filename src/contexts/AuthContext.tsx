import { getAuthUser, loginUser, logoutUser } from "@/apis/user";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface authContextType {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  login: (username: string, password: string, redirectPath: string) => void;
  logout: () => void;
  loading: boolean;
}

const initialAuthContext: authContextType = {
  username: null,
  setUsername: () => null,
  login: () => null,
  logout: () => null,
  loading: true,
};

export const AuthContext = createContext<authContextType>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch the authenticated user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getAuthUser();

        if (res.success) {
          setUsername(res.user.username);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (
    username: string,
    password: string,
    redirectPath: string
  ) => {
    const res = await loginUser(username, password);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setUsername(username);

    navigate(redirectPath, { replace: true });
  };
  const logout = async () => {
    const res = await logoutUser();
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    setUsername(null);
  };

  const value = {
    username,
    setUsername,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

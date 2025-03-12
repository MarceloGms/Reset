import { createContext, useEffect, useState, useContext } from "react";

interface User {
  id: string;
  name: string;
  userType: "Tecnico" | "Logística";
}

interface AuthContextProps {
  currentUser: User | null;
  currentToken: string | null;
  isAuthenticated: boolean;
  updateUser: (user: User | null) => void;
  updateToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  currentToken: null,
  isAuthenticated: false,
  updateUser: () => {},
  updateToken: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [currentToken, setCurrentToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const isAuthenticated = !!currentUser;

  const updateUser = (user: User | null) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const updateToken = (token: string | null) => {
    setCurrentToken(token);
    localStorage.setItem("token", JSON.stringify(token));
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", JSON.stringify(currentToken));
  }, [currentUser, currentToken]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentToken,
        isAuthenticated,
        updateUser,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para consumir o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext } from "react";

interface UserContextType {
  userToken: string | null;
  updateUserToken(value: string | null): void;
}

const UserContext = createContext<UserContextType>({
  userToken: null,
  updateUserToken: () => {},
});

export { UserContext };

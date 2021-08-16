import React, { useCallback, useMemo, useState } from "react";
import { UserContext } from "./UserContext";

export interface Props {
  children?: React.ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const updateUserToken = useCallback(
    (value: string | null) => setUserToken(value),
    []
  );

  const contextValue = useMemo(() => {
    return { userToken, updateUserToken };
  }, [updateUserToken, userToken]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

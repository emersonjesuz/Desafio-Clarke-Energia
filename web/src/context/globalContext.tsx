"use client";
import * as React from "react";

type GlobalContextProps = {
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_VALUE: GlobalContextProps = {
  showLoading: false,
  setShowLoading: () => {},
};

export const GlobalContext =
  React.createContext<GlobalContextProps>(DEFAULT_VALUE);

export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const [showLoading, setShowLoading] = React.useState<boolean>(false);

  const memoizedValue = React.useMemo(
    () => ({
      showLoading,
      setShowLoading,
    }),
    [showLoading],
  );

  return (
    <GlobalContext.Provider value={memoizedValue}>
      {children}
    </GlobalContext.Provider>
  );
}

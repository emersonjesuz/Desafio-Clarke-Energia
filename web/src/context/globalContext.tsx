"use client";
import * as React from "react";

interface ModalAvarage {
  companyId: string;
  supplierId: string;
  open: boolean;
}

type GlobalContextProps = {
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modalAverage: ModalAvarage;
  setModalAverage: React.Dispatch<React.SetStateAction<ModalAvarage>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_VALUE: GlobalContextProps = {
  showLoading: false,
  setShowLoading: () => {},
  modalAverage: {
    companyId: "",
    supplierId: "",
    open: false,
  },
  setModalAverage: () => {},
};

export const GlobalContext =
  React.createContext<GlobalContextProps>(DEFAULT_VALUE);

export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const [modalAverage, setModalAverage] = React.useState<ModalAvarage>({
    companyId: "",
    supplierId: "",
    open: false,
  });

  const memoizedValue = React.useMemo(
    () => ({
      showLoading,
      setShowLoading,
      modalAverage,
      setModalAverage,
    }),
    [showLoading, modalAverage],
  );

  return (
    <GlobalContext.Provider value={memoizedValue}>
      {children}
    </GlobalContext.Provider>
  );
}

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
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
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
  openMenu: false,
  setOpenMenu: () => {},
};

export const GlobalContext =
  React.createContext<GlobalContextProps>(DEFAULT_VALUE);

export function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const [showLoading, setShowLoading] = React.useState<boolean>(false);
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
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
      openMenu,
      setOpenMenu,
    }),
    [showLoading, modalAverage, openMenu],
  );

  return (
    <GlobalContext.Provider value={memoizedValue}>
      {children}
    </GlobalContext.Provider>
  );
}

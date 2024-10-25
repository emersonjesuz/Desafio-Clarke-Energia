"use client";
import Loading from "@/app/loading";
import Header from "../header";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import ModalConfirmContract from "../modalConfirmContract";
import { Toaster } from "@/components/ui/toaster";
import Menu from "../menu";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoading, modalAverage, openMenu } = useContext(GlobalContext);
  return (
    <>
      {showLoading && <Loading />}
      {modalAverage.open && <ModalConfirmContract />}
      {openMenu && <Menu />}
      <Toaster />
      <Header />

      {children}
    </>
  );
}

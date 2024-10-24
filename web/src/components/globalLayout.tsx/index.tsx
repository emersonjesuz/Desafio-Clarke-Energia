"use client";
import Loading from "@/app/loading";
import Header from "../header";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";
import ModalConfirmContract from "../modalConfirmContract";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoading, modalAverage } = useContext(GlobalContext);
  return (
    <>
      {showLoading && <Loading />}
      {modalAverage.open && <ModalConfirmContract />}
      <Header />
      {children}
    </>
  );
}

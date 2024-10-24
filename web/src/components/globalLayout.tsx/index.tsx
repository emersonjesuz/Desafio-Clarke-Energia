"use client";
import Loading from "@/app/loading";
import Header from "../header";
import { useContext } from "react";
import { GlobalContext } from "@/context/globalContext";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLoading } = useContext(GlobalContext);
  return (
    <>
      {showLoading && <Loading />}
      <Header />
      {children}
    </>
  );
}

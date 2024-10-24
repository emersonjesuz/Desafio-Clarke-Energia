"use client";
import { MdMenu } from "react-icons/md";
import LogoClarkeGreen from "../icons/logoClarkeGreen";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 z-50 flex h-28 w-screen items-center justify-around border-b border-b-[#e5e7eb] bg-gradient-to-l from-[#2e2e2e] to-[#005931]">
      <nav className="flex w-[90%] max-w-7xl items-center justify-between 2xl:w-[65%]">
        <Link href="/">
          <LogoClarkeGreen className="h-[63px] w-[116px] cursor-pointer" />
        </Link>

        <div className="hidden items-center lg:flex">
          <ul className="flex items-center justify-between font-poppins text-[14px] font-medium text-[#e5e7eb] lg:gap-4 xl:gap-10">
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              <Link
                target="_blank"
                href="https://clarke.com.br/mercado-livre-de-energia"
              >
                Mercado livre de energia
              </Link>
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              <Link
                target="_blank"
                href="https://clarke.com.br/nossas-solucoes"
              >
                Nossas soluções
              </Link>
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              <Link target="_blank" href="https://clarke.com.br/sobre-nos">
                Sobre nós
              </Link>
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              <Link target="_blank" href="https://blog.clarke.com.br/">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/cadastro"
            id="registerHeader"
            className="rounded-3xl bg-white px-4 py-2 font-poppins text-[12px] text-black transition-colors hover:bg-white/60"
          >
            Ser um cliente
          </Link>
          <Link
            href="/login"
            id="loginHeader"
            className="rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black transition-colors hover:bg-greenClarke/60"
          >
            Área do cliente
          </Link>
        </div>

        <button className="rounded-full bg-[#e6f9dc] p-2 hover:bg-[#e6f9dc]/50 lg:hidden">
          <MdMenu className="h-[24px] w-[24px]" />
        </button>
      </nav>
    </header>
  );
}

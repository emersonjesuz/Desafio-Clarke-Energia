import { MdMenu } from "react-icons/md";
import LogoClarkeGreen from "../icons/logoClarkeGreen";

export default function Header() {
  return (
    <header className="absolute top-0 z-50 flex h-28 w-screen items-center justify-around border-b border-b-[#e5e7eb] bg-gradient-to-l from-[#2e2e2e] to-[#005931]">
      <nav className="flex w-[90%] max-w-7xl items-center justify-between 2xl:w-[65%]">
        <LogoClarkeGreen className="h-[63px] w-[116px]" />

        <div className="hidden items-center lg:flex">
          <ul className="flex items-center justify-between font-poppins text-[14px] font-medium text-[#e5e7eb] lg:gap-4 xl:gap-10">
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              Mercado livre de energia
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              Nossas soluções
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              Sobre nós
            </li>
            <li className="cursor-pointer hover:scale-105 hover:text-white">
              Blog
            </li>
          </ul>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <button className="rounded-3xl bg-white px-4 py-2 font-poppins text-[12px] text-black">
            Tornasse um cliente
          </button>
          <button className="rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black">
            Área do cliente
          </button>
        </div>

        <button className="rounded-full bg-[#e6f9dc] p-2 lg:hidden">
          <MdMenu className="h-[24px] w-[24px]" />
        </button>
      </nav>
    </header>
  );
}

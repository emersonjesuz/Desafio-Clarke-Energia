import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { GlobalContext } from "@/context/globalContext";
import Link from "next/link";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import LogoClarkeGreen from "../icons/logoClarkeGreen";
export default function Menu() {
  const { setOpenMenu, openMenu } = useContext(GlobalContext);

  return (
    <Sheet open={openMenu}>
      <SheetContent className="max-h-screen w-full border-none bg-gradient-to-l from-[#2e2e2e] to-[#005931] p-0 lg:hidden">
        <SheetHeader className="flex h-28 w-full flex-row items-center justify-between border-b border-b-[#e5e7eb] px-4 py-3 pt-3">
          <Link href="/">
            <LogoClarkeGreen className="h-[63px] w-[116px] cursor-pointer" />
          </Link>
          <button
            onClick={() => setOpenMenu(false)}
            className="flex items-center justify-center rounded-full bg-[#e6f9dc] p-2"
          >
            <MdClose className="h-[24px] w-[24px]" />
          </button>
        </SheetHeader>

        <div className="flex h-full max-h-screen w-full flex-col items-center justify-between p-4">
          <ul className="h- flex w-full flex-col justify-between gap-8 font-poppins text-[14px] font-medium text-[#e5e7eb]">
            <li className="cursor-pointer text-[16px]">
              <Link onClick={() => setOpenMenu(false)} href="/">
                Inicio
              </Link>
            </li>
            <li className="cursor-pointer text-[16px]">
              <Link
                target="_blank"
                href="https://clarke.com.br/mercado-livre-de-energia"
              >
                Mercado livre de energia
              </Link>
            </li>
            <li className="cursor-pointer text-[16px]">
              <Link
                target="_blank"
                href="https://clarke.com.br/nossas-solucoes"
              >
                Nossas soluções
              </Link>
            </li>
            <li className="cursor-pointer text-[16px]">
              <Link target="_blank" href="https://clarke.com.br/sobre-nos">
                Sobre nós
              </Link>
            </li>
            <li className="cursor-pointer text-[16px]">
              <Link target="_blank" href="https://blog.clarke.com.br/">
                Blog
              </Link>
            </li>
          </ul>
          <div className="fixed bottom-10 left-1/2 flex w-full -translate-x-1/2 flex-col items-center justify-center gap-4 px-4">
            <Link
              onClick={() => setOpenMenu(false)}
              href="/cadastro"
              id="registerMenu"
              className="w-full rounded-3xl bg-white px-4 py-3 text-center font-poppins text-[12px] text-black"
            >
              Ser um cliente
            </Link>
            <Link
              href="/login"
              onClick={() => setOpenMenu(false)}
              id="loginMenu"
              className="w-full rounded-3xl bg-greenClarke px-4 py-3 text-center font-poppins text-[12px] text-black"
            >
              Área do cliente
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

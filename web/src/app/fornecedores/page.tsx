import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import imageReserve from "@/assets/image-reserva.jpg";
import Image from "next/image";
import { FaBolt } from "react-icons/fa6";

export default function Fornecedores() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-[#f2f2f2] p-4 py-36 lg:h-[80%]">
      <div className="flex flex-col items-center justify-center gap-10 rounded-xl lg:w-[65%]">
        <section className="flex w-full flex-col items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-md shadow-black/20 lg:p-8">
          <h1 className="text-center font-poppins text-3xl font-bold text-greenClarke">
            Nossas soluções
          </h1>
          <p className="px-4 text-center font-poppins text-[14px] text-black lg:text-[16px]">
            Conheça os serviços da Clarke Energia e escolha aquele que mais se
            adequa a sua empresa
          </p>
        </section>
        <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-white lg:p-8">
          {[1, 2, 3, 4, 5, 6, 7].map((value, index) => (
            <div className="relative flex h-[500px] w-[340px] flex-col items-center justify-between gap-2 rounded-lg border-2 border-zinc-200 pb-5 shadow-md lg:min-w-[300px] lg:shadow-black/20">
              <div className="absolute right-4 top-4 flex h-10 w-16 items-center justify-center rounded-full border-2 border-greenClarke/50 bg-white shadow-md shadow-black/10">
                <FaBolt className="h-5 w-5 fill-greenClarke" />
                <span className="font-poppins text-greenClarke">4.5</span>
              </div>
              <Image
                src={
                  index % 2 === 0
                    ? "https://i.pinimg.com/564x/45/b4/d9/45b4d9cbeeadfb87b846bdea3425694b.jpg"
                    : "https://i.pinimg.com/564x/d6/41/ea/d641ea7b25fadff97eb3fcdc25530a87.jpg"
                }
                width={10000}
                height={10000}
                alt="fornecedores"
                className="h-[250px] w-full rounded-t object-cover shadow"
              />

              <div className="flex h-full w-full flex-col items-center justify-between p-4">
                <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center font-poppins text-2xl font-semibold capitalize text-[#2e2e2e]">
                  Fornecedores adfdafaf safdadsaad sada
                </h1>

                <ul className="flex w-full flex-col items-center justify-center">
                  <li className="flex w-full items-center justify-start gap-2">
                    <span className="font-poppins text-black/50">
                      Estado de origem:
                    </span>
                    <span className="font-poppins text-greenClarke">SP</span>
                  </li>
                  <li className="flex w-full items-center justify-start gap-2">
                    <span className="font-poppins text-black/50">
                      Preço do kWh:
                    </span>
                    <span className="font-poppins text-greenClarke">
                      R$ 0,656/kWh
                    </span>
                  </li>
                  <li className="flex w-full items-center justify-start gap-2">
                    <span className="font-poppins text-black/50">
                      Limite mínimo de kWh:
                    </span>
                    <span className="font-poppins text-greenClarke">
                      220kWh
                    </span>
                  </li>
                  <li className="flex w-full items-center justify-start gap-2">
                    <span className="font-poppins text-black/50">
                      Total de clientes:
                    </span>
                    <span className="font-poppins text-greenClarke">100</span>
                  </li>
                </ul>
              </div>
              <div className="w-full px-4">
                <button className="w-full rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black">
                  Contratar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import ListSupplier from "@/components/listSupplier";

export default function Fornecedores() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center bg-[#f2f2f2] p-4 py-36 lg:h-[80%]">
      <div className="flex max-w-7xl flex-col items-center justify-center gap-10 rounded-xl lg:w-[65%]">
        <section className="flex w-full flex-col items-center justify-between gap-2 rounded-lg bg-white p-4 shadow-md shadow-black/20 lg:p-8">
          <h1 className="text-center font-poppins text-3xl font-bold text-greenClarke">
            Nossas soluções
          </h1>
          <p className="px-4 text-center font-poppins text-[14px] text-black lg:text-[16px]">
            Conheça os serviços da Clarke Energia e escolha aquele que mais se
            adequa a sua empresa
          </p>
        </section>
        <ListSupplier />
      </div>
    </main>
  );
}

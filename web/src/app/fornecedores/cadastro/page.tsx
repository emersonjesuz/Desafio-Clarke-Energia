import FormSuppliersRegister from "@/components/formSuppliersRegister";
import LogoClarkeGreen from "@/components/icons/logoClarkeOrange";

export default function Cadastro() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#f2f2f2] p-4 py-32 lg:h-[80%]">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-10 rounded-xl bg-white p-4 lg:p-8">
        <section className="flex w-full items-center justify-between bg-white">
          <LogoClarkeGreen className="h-[63px] w-[116px] fill-slate-500" />
          <h1 className="text-md text-center font-poppins font-bold text-orangeClarke lg:text-2xl">
            Seja Clarke
          </h1>
        </section>
        <p className="text-center font-poppins text-[14px] text-black lg:text-[16px]">
          Quer se conecta com as empresas mais consumidoras de energia do
          Brasil? vender energia no maior pauco do
          <span className="px-2 text-orangeClarke">
            Mercado Livre de Energia
          </span>
          no Brasil?,
          <span className="px-2 text-lg text-orangeClarke">
            Seja um parceiro da Clarke
          </span>
        </p>
        <FormSuppliersRegister />
      </div>
    </div>
  );
}

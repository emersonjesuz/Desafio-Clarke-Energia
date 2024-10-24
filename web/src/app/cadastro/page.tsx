import FormRegister from "@/components/formRegister";
import LogoClarkeGreen from "@/components/icons/logoClarkeGreen";

export default function Cadastro() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#f2f2f2] p-4 py-32 lg:h-[80%]">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-10 rounded-xl bg-white p-4 lg:p-8">
        <section className="flex w-full items-center justify-between bg-white">
          <LogoClarkeGreen className="h-[63px] w-[116px]" />
          <h1 className="text-md text-center font-poppins font-bold text-greenClarke lg:text-2xl">
            Seja bem-vindo
          </h1>
        </section>
        <p className="text-center font-poppins text-[14px] text-black lg:text-[16px]">
          Quer encontrar a melhor solução para o seu negócio? Encontramos os
          <span className="px-2 text-greenClarke">
            fornecedores com potencial
          </span>
          para o seu negócio!
        </p>
        <FormRegister />
      </div>
    </div>
  );
}

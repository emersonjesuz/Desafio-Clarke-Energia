import FormLogin from "@/components/formLogin";
import LogoClarkeGreen from "@/components/icons/logoClarkeGreen";

export default function Login() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[#f2f2f2] p-4 py-32 lg:h-[80%]">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-10 rounded-xl bg-white p-4 lg:p-8">
        <section className="flex w-full items-center justify-between bg-white">
          <LogoClarkeGreen className="h-[63px] w-[116px]" />
          <h1 className="text-md text-center font-poppins font-bold text-greenClarke lg:text-2xl">
            Bem vindo de volta
          </h1>
        </section>
        <FormLogin />
      </div>
    </div>
  );
}

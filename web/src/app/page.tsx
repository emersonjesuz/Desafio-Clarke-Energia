import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen w-screen">
      <div className="h-full w-full bg-gradient-to-l from-[#2e2e2e] to-[#005931] py-32 lg:h-[80%] lg:py-0 lg:pt-16">
        <Dashboard />
      </div>
      <div className="p-5">
        <p className="text-center font-poppins text-[14px] font-bold text-black lg:text-[24px]">
          Somos uma gestora de energia aprovada por{" "}
          <span className="text-greenClarke">líderes</span> do mercado
        </p>
      </div>
    </div>
  );
}

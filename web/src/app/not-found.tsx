import narutoGif from "@/assets/naruto.gif";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-poppins text-3xl font-bold text-greenClarke">
          Página não encontrada
        </h1>
        <p className="text-[0.8rem] text-muted-foreground">
          Tente acessar a página principal
        </p>
      </div>
      <Image className="rounded-[20px]" priority src={narutoGif} alt="Naruto" />
    </div>
  );
}

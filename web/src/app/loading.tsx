import Image from "next/image";
import loadGif from "../assets/gif-load.gif";
export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center justify-center bg-white p-4 py-32 lg:h-[80%]">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-10 rounded-xl p-4 lg:p-8">
        <section className="flex w-full items-center justify-center bg-white">
          <Image src={loadGif} alt="loading gif" className="z-0 h-20 w-20" />
        </section>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import ImagePhone from "@/assets/image-celular.png";
import ImageBolt from "@/assets/background-raio.png";

export default function ImageHome() {
  return (
    <div className="hidden min-h-[700px] w-full items-center justify-center lg:flex">
      <Image
        src={ImageBolt}
        width={1000}
        height={1000}
        alt="clarke-energia-home"
        className="absolute z-0 h-[850px] w-[900px] min-w-[800px] object-cover"
      />
      <Image
        src={ImagePhone}
        width={1000}
        height={1000}
        alt="clarke-energia-home"
        className="z-10 w-[500px] min-w-[500px] rotate-12 object-cover"
      />
    </div>
  );
}

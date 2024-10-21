import backgroundAndPhoneImage from "@/assets/hero-section.png";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <section className="relative mx-auto flex h-[100%] min-h-[70vh] w-full flex-col lg:w-[65%] lg:flex-row">
      <div className="flex-col items-center justify-center px-4 pb-4 lg:flex lg:items-start">
        <h1 className="flex-col text-center font-poppins text-4xl font-bold text-white lg:flex lg:min-w-[500px] lg:py-10 lg:text-left lg:text-5xl lg:leading-[60px]">
          Compre energia até
          <span className="px-1 text-greenClarke">40% mais barata</span>
          para sua empresa
        </h1>
        <p className="px-4 text-center font-poppins text-[14px] text-white lg:text-[16px]">
          Sem investimentos e sem dor de cabeça!
        </p>
        <button className="z-30 mx-auto mt-5 hidden w-[90%] items-center justify-between gap-5 rounded-3xl bg-greenClarke/80 p-2 transition-colors hover:bg-greenClarke/40 lg:mx-0 lg:flex lg:w-[300px]">
          <span className="pl-4 font-poppins text-white">
            Quero ser um cliente{" "}
          </span>
          <div className="rounded-full bg-white p-3">
            <FaArrowRightLong className="fill-greenClarke" />
          </div>
        </button>
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div className="relative flex w-full items-center justify-center">
          <Image
            src={backgroundAndPhoneImage}
            alt="background and phone image"
            className="z-0 h-full min-h-[70vh] w-full lg:pt-10"
          />
          <button className="absolute -bottom-10 z-30 mx-auto flex w-[90%] items-center justify-between gap-5 rounded-3xl bg-greenClarke/80 p-2 lg:hidden lg:w-[300px]">
            <span className="pl-4 font-poppins text-white">
              Quero ser um cliente{" "}
            </span>
            <div className="rounded-full bg-white p-3">
              <FaArrowRightLong className="fill-greenClarke" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

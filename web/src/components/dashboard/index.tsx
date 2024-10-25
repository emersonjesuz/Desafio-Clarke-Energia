import backgroundAndPhoneImage from "@/assets/hero-section.png";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import ImageHome from "../ImageHome";

export default function Dashboard() {
  return (
    <section className="relative mx-auto flex h-[100%] min-h-[70vh] w-full flex-col lg:w-[65%] lg:flex-row">
      <div className="relative z-30 flex-col items-center justify-center px-4 pb-4 lg:flex lg:items-start">
        <h1 className="flex-col text-center font-poppins text-4xl font-bold text-white lg:flex lg:min-w-[500px] lg:py-10 lg:text-left lg:text-5xl lg:leading-[60px]">
          Compre energia até
          <span className="px-1 text-greenClarke">40% mais barata</span>
          para sua empresa
        </h1>
        <p className="px-4 text-center font-poppins text-[14px] text-white lg:text-[16px]">
          Sem investimentos e sem dor de cabeça!
        </p>
        <Link
          href="/cadastro"
          id="registerDesktop"
          className="z-30 mx-auto mt-5 hidden w-[90%] items-center justify-between gap-5 rounded-3xl bg-greenClarke/80 p-2 transition-colors hover:bg-greenClarke/40 lg:mx-0 lg:flex lg:w-[300px]"
        >
          <span className="pl-4 font-poppins text-white">
            Quero ser um cliente{" "}
          </span>
          <div className="rounded-full bg-white p-3">
            <FaArrowRightLong className="fill-greenClarke" />
          </div>
        </Link>
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div className="relative flex h-full w-full items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              src={backgroundAndPhoneImage}
              width={1000}
              height={1000}
              alt="background and phone image"
              className="z-0 h-auto w-full lg:hidden"
            />
          </Suspense>
          <ImageHome />
          <Link
            href="/cadastro"
            id="registerMobile"
            className="absolute -bottom-10 z-30 mx-auto flex w-[90%] items-center justify-between gap-5 rounded-3xl bg-greenClarke/80 p-2 lg:hidden lg:w-[300px]"
          >
            <span className="pl-4 font-poppins text-white">
              Quero ser um cliente{" "}
            </span>
            <div className="rounded-full bg-white p-3">
              <FaArrowRightLong className="fill-greenClarke" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

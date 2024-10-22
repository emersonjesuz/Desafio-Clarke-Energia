"use client";
import Loading from "@/app/loading";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import imageReserve from "../../assets/image-reserva.jpg";
import { FaBolt } from "react-icons/fa6";

interface Supplier {
  id: string;
  name: string;
  minimumKwh: number;
  kwhAmount: number;
  logo: string;
  state: string;
  avarage: number;
  Contracts: {
    id: string;
  }[];
}

const GET_SUPPLIERS = gql`
  query GetSuppliers($valueKwh: Float!) {
    listSuppliers(valueKwh: $valueKwh) {
      id
      name
      minimumKwh
      kwhAmount
      logo
      state
      avarage
      Contracts {
        id
      }
    }
  }
`;

export default function ListSupplier() {
  const { loading, error, data } = useQuery(GET_SUPPLIERS, {
    variables: {
      valueKwh: 160,
    },
  });

  console.log(data);
  console.log(error?.message);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-white lg:p-8">
      {loading && <Loading />}

      {data?.listSuppliers.map((supplier: Supplier) => (
        <div className="relative flex h-[500px] w-[340px] flex-col items-center justify-between gap-2 rounded-lg border-2 border-zinc-200 pb-5 shadow-md lg:min-w-[300px] lg:shadow-black/20">
          <div className="absolute right-4 top-4 flex h-10 w-16 items-center justify-center rounded-full border-2 border-greenClarke/50 bg-white shadow-md shadow-black/10">
            <FaBolt className="h-5 w-5 fill-greenClarke" />
            <span className="font-poppins text-greenClarke">
              {supplier.avarage}
            </span>
          </div>
          <Image
            src={supplier.logo ? supplier.logo : imageReserve}
            width={10000}
            height={10000}
            alt="fornecedores"
            className="h-[250px] w-full rounded-t object-cover shadow"
          />

          <div className="flex h-full w-full flex-col items-center justify-between p-4">
            <h1 className="w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 text-center font-poppins text-2xl font-semibold capitalize text-[#2e2e2e]">
              {supplier.name}
            </h1>

            <ul className="flex w-full flex-col items-center justify-center">
              <li className="flex w-full items-center justify-start gap-2">
                <span className="font-poppins text-black/50">
                  Estado de origem:
                </span>
                <span className="font-poppins text-greenClarke">
                  {supplier.state}
                </span>
              </li>
              <li className="flex w-full items-center justify-start gap-2">
                <span className="font-poppins text-black/50">
                  Preço do kWh:
                </span>
                <span className="font-poppins text-greenClarke">
                  R$ {supplier.minimumKwh}/kWh
                </span>
              </li>
              <li className="flex w-full items-center justify-start gap-2">
                <span className="font-poppins text-black/50">
                  Limite mínimo de kWh:
                </span>
                <span className="font-poppins text-greenClarke">
                  {supplier.kwhAmount}kWh
                </span>
              </li>
              <li className="flex w-full items-center justify-start gap-2">
                <span className="font-poppins text-black/50">
                  Total de clientes:
                </span>
                <span className="font-poppins text-greenClarke">
                  {supplier.kwhAmount}
                </span>
              </li>
            </ul>
          </div>
          <div className="w-full px-4">
            <button className="w-full rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black">
              Contratar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

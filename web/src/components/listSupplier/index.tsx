"use client";
import { GlobalContext } from "@/context/globalContext";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useLayoutEffect } from "react";
import CardSupplier from "../cardSupplier";

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
    companyId: string;
    supplierId: string;
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
        companyId
        supplierId
      }
    }
  }
`;

const GET_COMPANIE = gql`
  query GetCompanies($id: String!) {
    findCompany(id: $id) {
      kwh
    }
  }
`;

export default function ListSupplier() {
  const { id } = useParams();
  const route = useRouter();
  const { setShowLoading } = useContext(GlobalContext);

  const { data: dataCompany, error: errorCompany } = useQuery(GET_COMPANIE, {
    variables: {
      id: id,
    },
  });
  const [listSuppliers, { loading, data }] = useLazyQuery(GET_SUPPLIERS);

  useEffect(() => {
    if (dataCompany) {
      listSuppliers({
        variables: { valueKwh: dataCompany?.findCompany.kwh },
      }).catch((err) => {
        alert(err.message);
      });
    }
    if (errorCompany) {
      route.push("/login");
    }

    setShowLoading(loading);
  }, [dataCompany, errorCompany]);

  useLayoutEffect(() => {
    setShowLoading(true);
  }, []);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-5 rounded-lg bg-white lg:p-8">
      {data?.listSuppliers.length ? (
        data.listSuppliers.map((supplier: Supplier) => (
          <CardSupplier key={supplier.id} supplier={supplier} />
        ))
      ) : (
        <h1 className="p-1 text-center font-poppins text-xl font-bold text-black lg:p-8 lg:text-3xl">
          Não foram encontrados soluções que se adequem ao seu negócio!
          <span className="px-2 text-greenClarke">Mas não desanime,</span>
          Ainda podemos ajudá-lo
          <Link
            href={"https://clarke.com.br/"}
            target="_blank"
            className="px-2 text-greenClarke underline hover:text-greenClarke/50"
          >
            simule sua economia
          </Link>
        </h1>
      )}
    </div>
  );
}

import { GlobalContext } from "@/context/globalContext";
import { gql, useMutation } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Suspense, useContext } from "react";
import { FaBolt } from "react-icons/fa6";
import imageReserve from "../../assets/image-reserva.jpg";

interface Props {
  supplier: Supplier;
}

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

const CREATE_CONTRACT = gql`
  mutation CreateContract($companyId: String!, $supplierId: String!) {
    createContract(contract: { companyId: $companyId, supplierId: $supplierId })
  }
`;

export default function CardSupplier({ supplier }: Props) {
  const { id } = useParams();
  const { setModalAverage } = useContext(GlobalContext);
  const [createContract] = useMutation(CREATE_CONTRACT);

  function handleContract() {
    createContract({
      variables: {
        companyId: id.toString(),
        supplierId: supplier.id,
      },
    }).catch(() => {
      alert("Erro ao criar o contrato");
    });

    setModalAverage({
      companyId: id.toString(),
      supplierId: supplier.id,
      open: true,
    });
  }

  function existingContract(): boolean {
    if (supplier.Contracts.length > 0) {
      return true;
    }
    return !!supplier.Contracts.find((contract) => contract.companyId === id);
  }

  return (
    <div
      data-key={supplier.id}
      key={supplier.id}
      className="relative flex h-[500px] w-[340px] flex-col items-center justify-between gap-2 rounded-lg border-2 border-zinc-200 pb-5 shadow-md lg:min-w-[300px] lg:shadow-black/20"
    >
      <div className="absolute right-4 top-4 flex h-10 w-16 items-center justify-center rounded-full border-2 border-greenClarke/50 bg-white shadow-md shadow-black/10">
        <FaBolt className="h-5 w-5 fill-greenClarke" />
        <span className="font-poppins text-greenClarke">
          {supplier.avarage}
        </span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Image
          src={supplier.logo ? supplier.logo : imageReserve}
          width={10000}
          height={10000}
          alt="fornecedores"
          className="h-[250px] min-h-[250px] w-full rounded-t object-cover shadow"
        />
      </Suspense>
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
            <span className="font-poppins text-black/50">Preço do kWh:</span>
            <span className="font-poppins text-greenClarke">
              R$ {supplier.kwhAmount}/kWh
            </span>
          </li>
          <li className="flex w-full items-center justify-start gap-2">
            <span className="font-poppins text-black/50">
              Limite mínimo de kWh:
            </span>
            <span className="font-poppins text-greenClarke">
              {supplier.minimumKwh} kWh
            </span>
          </li>
          <li className="flex w-full items-center justify-start gap-2">
            <span className="font-poppins text-black/50">
              Total de clientes:
            </span>
            <span className="font-poppins text-greenClarke">
              {supplier.Contracts.length}
            </span>
          </li>
        </ul>
      </div>
      <div className="w-full px-4">
        <button
          type="button"
          data-contract={existingContract()}
          disabled={existingContract()}
          onClick={handleContract}
          className="w-full cursor-pointer rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black transition-colors hover:bg-greenClarke/80 data-[contract=true]:bg-[#ff6347]"
        >
          {existingContract() ? "Solicitação Concruida" : "Contratar"}
        </button>
      </div>
    </div>
  );
}

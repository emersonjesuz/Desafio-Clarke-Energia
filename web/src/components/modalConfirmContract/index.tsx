import { GlobalContext } from "@/context/globalContext";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { FaBolt } from "react-icons/fa6";

const AVUALUATES = gql`
  mutation AddEvaluation(
    $supplierId: String!
    $companyId: String!
    $note: Float!
  ) {
    addEvaluationSupplier(
      evaluation: {
        companyId: $companyId
        supplierId: $supplierId
        note: $note
      }
    )
  }
`;

export default function ModalConfirmContract() {
  const [avarage, setAvarage] = useState(1);
  const [addEvaluationSupplier] = useMutation(AVUALUATES);
  const { modalAverage, setModalAverage } = useContext(GlobalContext);

  function handleSubmit() {
    addEvaluationSupplier({
      variables: {
        supplierId: modalAverage.supplierId,
        companyId: modalAverage.companyId,
        note: avarage,
      },
    }).catch(() => {
      //   Não vai exibir o erro na tela
    });
    setModalAverage({
      companyId: "",
      supplierId: "",
      open: false,
    });
    alert("Solicitação concluída!");
    window.location.reload(); // forçar atualização da tela
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="flex w-[90%] max-w-[500px] flex-col items-center justify-center gap-10 rounded-xl bg-white p-4">
        <h1 className="text-center font-poppins text-lg font-bold text-greenClarke lg:text-2xl">
          Solicitação concluída!
        </h1>
        <section className="flex h-full w-full flex-col items-center justify-between gap-5 bg-white">
          <p className="text-center font-poppins text-[14px] text-black/70 lg:text-[16px]">
            Avalie nosso negócio
          </p>
          <div className="flex items-center justify-center gap-2">
            <FaBolt
              data-average-key="1"
              data-average={avarage >= 1 ? true : false}
              onClick={() => setAvarage(1)}
              className="h-10 w-10 cursor-pointer fill-zinc-300 data-[average=true]:scale-125 data-[average=true]:fill-[#ff6347] lg:hover:animate-pulse"
            />
            <FaBolt
              data-average={avarage >= 2 ? true : false}
              data-average-key="2"
              onClick={() => setAvarage(2)}
              className="h-10 w-10 cursor-pointer fill-zinc-300 data-[average=true]:scale-125 data-[average=true]:fill-[#ff6347] lg:hover:animate-pulse"
            />
            <FaBolt
              data-average={avarage >= 3 ? true : false}
              data-average-key="3"
              onClick={() => setAvarage(3)}
              className="h-10 w-10 cursor-pointer fill-zinc-300 data-[average=true]:scale-125 data-[average=true]:fill-[#ff6347] lg:hover:animate-pulse"
            />
            <FaBolt
              data-average={avarage >= 4 ? true : false}
              data-average-key="4"
              onClick={() => setAvarage(4)}
              className="h-10 w-10 cursor-pointer fill-zinc-300 data-[average=true]:scale-125 data-[average=true]:fill-[#ff6347] lg:hover:animate-pulse"
            />
            <FaBolt
              data-average={avarage === 5}
              data-average-key="5"
              onClick={() => setAvarage(5)}
              className="h-10 w-10 cursor-pointer fill-zinc-300 data-[average=true]:scale-125 data-[average=true]:fill-[#ff6347] lg:hover:animate-pulse"
            />
          </div>
          <div className="flex w-full items-center justify-center gap-5 pb-5 lg:mt-10">
            <button
              type="button"
              id="button-avarege"
              onClick={() => handleSubmit()}
              className="w-[220px] rounded-3xl bg-greenClarke px-4 py-2 font-poppins text-[12px] text-black"
            >
              Confirmar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

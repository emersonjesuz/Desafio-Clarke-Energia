"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GlobalContext } from "@/context/globalContext";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CREATE_SUPPLIER = gql`
  mutation PostCreateSupplier(
    $cnpj: String!
    $kwhAmount: Float!
    $minimumKwh: Float!
    $name: String!
    $state: String!
    $logo: String!
  ) {
    createSupplier(
      supplier: {
        cnpj: $cnpj
        kwhAmount: $kwhAmount
        minimumKwh: $minimumKwh
        name: $name
        state: $state
        logo: $logo
      }
    ) {
      id
    }
  }
`;

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome não pode ser vazio" }),
  logo: z.string().optional(),
  cnpj: z.string().length(14, { message: "CNPJ preciso ter 14 caracteres" }),
  minimumKwh: z.string().min(1, { message: "Minimo de kWh deve ser 1" }),
  kwhAmount: z
    .string()
    .min(1, { message: "Valor de kWh deve ser maior que 0" }),
  state: z.string().length(2, { message: "UF deve ter 2 caracteres." }),
});
export default function FormSuppliersRegister() {
  const { setShowLoading } = useContext(GlobalContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: "",
      name: "",
      kwhAmount: "",
      state: "",
      logo: "",
      minimumKwh: "",
    },
  });

  const [createSupplier] = useMutation(CREATE_SUPPLIER);

  function extractDigits(input: string): string {
    return input.replace(/\D/g, "");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setShowLoading(true);
    createSupplier({
      variables: {
        name: values.name,
        cnpj: values.cnpj,
        kwhAmount: +values.kwhAmount,
        minimumKwh: +values.minimumKwh,
        logo: values.logo,
        state: values.state,
      },
    })
      .then(() => {
        setShowLoading(false);
        alert("Cadastrado com sucesso");
        form.reset();
      })
      .catch((error) => {
        handlerMessageError(error);
        setShowLoading(false);
      });
  }

  function handlerMessageError(error: { message: string }) {
    switch (error?.message.split(" ")[0]) {
      case "Nome":
        form.setError("name", { message: error.message });
        break;
      case "Minimo":
        form.setError("minimumKwh", { message: error.message });
        break;

      case "CNPJ":
        form.setError("cnpj", { message: error.message });
        break;
      case "Valor":
        form.setError("kwhAmount", { message: error.message });
        break;
      case "UF":
        form.setError("state", { message: error.message });
        break;

      default:
        break;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o nome da empresa?*
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  className="h-12 w-full"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* STATE */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o UF da empresa?*
              </FormLabel>
              <FormControl>
                <Input
                  type="string"
                  required
                  maxLength={2}
                  className="h-12 w-full"
                  placeholder=""
                  onChange={(e) => {
                    field.onChange(e.target.value.toUpperCase());
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* CNPJ */}
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o CNPJ da empresa?*
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  className="h-12 w-full"
                  placeholder=""
                  onChange={(e) => {
                    field.onChange(extractDigits(e.target.value));
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MINIMUM KWH */}
        <FormField
          control={form.control}
          name="minimumKwh"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o minumo de KWH é aceito?*
              </FormLabel>
              <FormControl>
                <Input
                  type="string"
                  required
                  className="h-12 w-full"
                  placeholder=""
                  onChange={(e) => {
                    field.onChange(extractDigits(e.target.value));
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KWH AMOUNT */}
        <FormField
          control={form.control}
          name="kwhAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-[16px]">
                Qual o Valor de KWH?*
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  className="h-12 w-full"
                  placeholder=""
                  onChange={(e) => {
                    field.onChange(extractDigits(e.target.value));
                  }}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* LOGO */}
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-[16px]">
                Qual o logo da empresa?
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-12 w-full"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          className="w-full rounded-2xl bg-orangeClarke px-4 py-2 font-poppins transition-colors hover:bg-orangeClarke/80"
          type="submit"
        >
          Confirmar
        </button>
      </form>
    </Form>
  );
}

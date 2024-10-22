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
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CREATE_COMPANY = gql`
  mutation PostCreateCompany(
    $email: String!
    $cnpj: String!
    $kwh: Float!
    $name: String!
    $phone: String!
  ) {
    createCompany(
      company: {
        email: $email
        cnpj: $cnpj
        kwh: $kwh
        name: $name
        phone: $phone
      }
    ) {
      id
    }
  }
`;

const formSchema = z.object({
  email: z.string().email({ message: "Email preciso ser válido" }),
  cnpj: z.string().length(14, { message: "CNPJ preciso ter 14 caracteres" }),
  kwh: z.string().min(1, { message: "KWH preciso ser maior que 0" }),
  name: z.string().min(1, { message: "Nome não pode ser vazio" }),
  phone: z
    .string()
    .length(11, { message: "Telefone preciso ter 11 caracteres" }),
});
export default function FormCadastro() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      cnpj: "",
      kwh: "",
      name: "",
      phone: "",
    },
  });

  const [createCompany, { error, data }] = useMutation(CREATE_COMPANY);

  function extractDigits(input: string): string {
    return input.replace(/\D/g, "");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCompany({
      variables: {
        email: values.email,
        cnpj: values.cnpj,
        kwh: +values.kwh,
        name: values.name,
        phone: values.phone,
      },
    }).catch(() => {
      // O foi tratado na função handlerMessageError
    });
  }

  function handlerMessageError() {
    switch (error?.message.split(" ")[0]) {
      case "Nome":
        form.setError("name", { message: error.message });
        break;
      case "Email":
        form.setError("email", { message: error.message });
        break;

      case "CNPJ":
        form.setError("cnpj", { message: error.message });
        break;
      case "KWH":
        form.setError("kwh", { message: error.message });
        break;
      case "Telefone":
        form.setError("phone", { message: error.message });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (data?.createCompany) {
      router.push(`/fornecedores/${data.createCompany.id}`);
    }
  }, [data]);

  useEffect(() => {
    if (error?.message) {
      handlerMessageError();
    }
  }, [error]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual seu nome?*
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o seu e-mail de trabalho?*
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">
                Qual o seu número de telefone?*
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  required
                  maxLength={11}
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
        <FormField
          control={form.control}
          name="kwh"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-[16px]">
                Qual o Valor médio da conta de luz da sua empresa?*
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

        <button
          className="w-full rounded-2xl bg-greenClarke px-4 py-2 font-poppins transition-colors hover:bg-[#2bb174]"
          type="submit"
        >
          Confirmar
        </button>
      </form>
    </Form>
  );
}

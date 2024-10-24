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
import { gql, useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const GET_COMPANIES = gql`
  query GetCompanies($email: String!) {
    findCompany(email: $email) {
      id
    }
  }
`;

const formSchema = z.object({
  email: z.string().email({ message: "Email preciso ser válido" }),
  password: z.string().optional(),
});
export default function FormLogin() {
  const router = useRouter();
  const { setShowLoading } = useContext(GlobalContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [findCompany, { error, data }] = useLazyQuery(GET_COMPANIES);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setShowLoading(true);
    findCompany({
      variables: { email: values.email },
    }).catch(() => {
      // Error não vai ser exibido na tela
    });
  }

  useEffect(() => {
    if (data?.findCompany) {
      setShowLoading(false);
      router.push(`/fornecedores/${data?.findCompany.id}`);
    }

    if (error?.message) {
      setShowLoading(false);
      form.setError("email", { message: error?.message });
    }
  }, [error, data]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  required
                  id="emailLogin"
                  className="h-12 w-full"
                  placeholder="Endereço de e-mail*"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="passwordLogin"
                  className="h-12 w-full"
                  placeholder="Senha opcional"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center justify-between gap-5">
          <button
            className="w-full rounded-2xl bg-greenClarke px-4 py-2 font-poppins transition-colors hover:bg-[#2bb174]"
            type="submit"
          >
            Confirmar
          </button>
          <button
            className="w-full rounded-2xl border-2 border-greenClarke bg-transparent px-4 py-2 font-poppins transition-colors hover:bg-greenClarke/20"
            type="button"
          >
            <Link
              href="/cadastro"
              className="w-full pt-5 text-end text-sm text-black"
            >
              Criar uma conta
            </Link>
          </button>
        </div>
      </form>
    </Form>
  );
}

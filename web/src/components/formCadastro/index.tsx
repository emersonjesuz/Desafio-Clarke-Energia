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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Email preciso ser válido" }),
  cnpj: z.string().length(14, { message: "CNPJ preciso ter 14 caracteres" }),
  kwh: z.string().min(1, { message: "KWH preciso ser maior que 0" }),
  name: z.string().min(1, { message: "Nome não pode ser vazio" }),
  phone: z
    .string()
    .length(11, { message: "Telefone preciso ter 11 caracteres" }),
  password: z.string(),
});
export default function FormCadastro() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      cnpj: "",
      kwh: "",
      password: "",
      name: "",
      phone: "",
    },
  });

  function extractDigits(input: string): string {
    return input.replace(/\D/g, "");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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

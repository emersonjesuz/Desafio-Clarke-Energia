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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Email preciso ser válido" }),
  password: z.string(),
});
export default function FormLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-2 font-poppins text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  required
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
                  required
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

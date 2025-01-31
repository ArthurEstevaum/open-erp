"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Oval } from "react-loader-spinner";
import logo from "@/assets/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "@/services/loginService";
import { useContext, useState } from "react";
import { AuthContext } from "@/auth/AuthContext";
import { useNavigate } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Nome de usuário deve ter pelo menos 2 caracteres" })
    .max(40, {
      message: "Nome de usuário deve ter no máximo 40 caracteres",
    }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setProcessing(true);
    const response = await loginService(values.username, values.password);
    if (response.ok) {
      const loginData = await response.json();
      auth?.login(loginData.token, loginData.permissions);
      navigate("/dashboard");
    }
    if (response.status === 403) {
      setError(true);
    }
    setProcessing(false);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2 md:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
                  <p className="text-balance text-muted-foreground">
                    Iniciar sessão no Open ERP
                  </p>
                  {error && (
                    <Alert variant="destructive" className="mt-4 dark:text-red-500 dark:border-red-500">
                      <AlertCircle className="dark:text-red-500 h-4 w-4" />
                      <AlertTitle>Usuário ou senha inválidos</AlertTitle>
                      <AlertDescription>
                        Tente novamente
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Nome de usuário</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="seu.nome" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {processing ? <Oval color="white" /> : "Entrar"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src={logo}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:invert"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        @estevaum.open-erp - 2025
      </div>
    </div>
  );
}

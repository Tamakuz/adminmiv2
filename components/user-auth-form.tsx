"use client";

import { Button } from "@/components/ui/button";
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
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Masukkan alamat email yang valid" }),
});

type UserFormValue = z.infer<typeof formSchema>;

const UserAuthForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: "demo@gmail.com",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      startTransition(async () => {
        const result = await signIn("credentials", {
          email: data.email,
          redirect: false,
        });

        if (result?.error) {
          toast.error(result.error || "Terjadi kesalahan saat login");
          return;
        }

        if (result?.ok) {
          toast.success("Berhasil masuk!");
          router.push(callbackUrl ?? "/dashboard");
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan pada sistem. Silakan coba lagi nanti.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Masukkan email anda..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </Form>
  );
};

export default UserAuthForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import imgurl from "../../../../public/assets/mainlogo.png";
import Image from "next/image";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <>
      
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-6xl bg-black rounded-lg shadow-2xl">
          {/* Left section with image */}
          <div className="flex justify-center bg-black p-8 lg:w-3/4">
            <Image
              src={imgurl}
              alt="Main Logo"
              className="w-96 h-96  shadow-md mb-2"
            />
          </div>
          {/* Right section with form */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-default">
                Welcome Back to YapNap
              </h1>
              <p className="mb-4 text-white">
                Sign in to continue your secret conversations
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email/Username</FormLabel>
                      <Input
                        {...field}
                        className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-500 text-white placeholder-white"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <Input
                        type="password"
                        {...field}
                        className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-500 text-white placeholder-white"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-default hover:bg-orange-700 text-white"
                >
                  Sign In
                </Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <p className="text-white">
                Not a member yet?{" "}
                <Link
                  href="/sign-up"
                  className="text-default hover:text-orange-800"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

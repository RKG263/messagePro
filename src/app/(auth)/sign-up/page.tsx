'use client';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';
import * as z from 'zod';
import Image from 'next/image';
import imgurl from '../../../../public/assets/mainlogo.png';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-screen-lg xl:max-w-screen-xl px-4 md:px-8 py-8 lg:py-12 rounded-lg shadow-2xl bg-black backdrop-blur-md flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex justify-center items-center">
            <Image
              src={imgurl}
              alt="Main Logo"
              className="w-96 h-96 rounded-full shadow-md mb-2"
            />
          </div>
          <div className="lg:w-3/4 flex justify-center items-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-default">
                  HoP in YapNap
                </h1>
                <p className="text-white">Sign up to start your anonymous adventure</p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Username</FormLabel>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setUsername(e.target.value);
                          }}
                          className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-500 text-white placeholder-white"
                        />
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && usernameMessage && (
                          <p
                            className={`text-sm ${
                              usernameMessage === 'Username is unique'
                                ? 'text-green-300'
                                : 'text-red-500'
                            }`}
                          >
                            {usernameMessage}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <Input
                          {...field}
                          name="email"
                          className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-500 text-white placeholder-white"
                        />
                        <p className="text-gray-200 text-sm">We will send you a verification code</p>
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
                          name="password"
                          className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-500 text-white placeholder-white"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-default hover:bg-orange-800 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </form>
              </Form>
              <div className="text-center mt-4">
                <p className="text-white">
                  Already a member?{' '}
                  <Link href="/sign-in" className="text-default hover:text-orange-800">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

"use client"
import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form"
import { Input } from "src/components/ui/input"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "src/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { getUserToken } from "src/getUserToken"
import { getCartData } from "src/CartAction/CartAction"
import { CartData } from "src/types/cart.type"
import { CountContext } from "src/CountProvider"

export default function Login() {
  const [btnLoading, setbtn] = useState<boolean>(true)
  const Route = useRouter()
  const countData = useContext(CountContext)

  const Schemelogin = z.object({
    email: z.string().email("Email Invaild").nonempty("Email Required"),
    password: z
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Enter Valid Password "
      ),
  })

  const LoginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(Schemelogin),
  })

  async function handlelogin(values: z.infer<typeof Schemelogin>) {
    setbtn(false)

    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
    if (data?.ok) {
      toast.success("Login success", { position: "top-center" })
      const token = await getUserToken()
      if (token) {
        const data: CartData = await getCartData()
        let sum: number = 0
        data.data.products.forEach((item) => {
          sum += Number(item.count)
          countData?.setCount(sum)
        })
      }
      Route.push("/")
    } else {
      toast.error(data?.error, { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-main mb-6">
          Login to your account
        </h1>

        <Form {...LoginForm}>
          <form
            className="space-y-5"
            onSubmit={LoginForm.handleSubmit(handlelogin)}
          >
           
            <FormField
              control={LoginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="Enter your email"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           
            <FormField
              control={LoginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Enter your password"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           
            <div className="text-right">
              <Link
                href="/forgetPassword"
                className="text-sm text-main hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            
            {btnLoading ? (
              <Button className="w-full bg-main text-white rounded-lg shadow-md hover:opacity-90">
                Login
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full bg-main text-white rounded-lg"
              >
                <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                Loading
              </Button>
            )}
          </form>
        </Form>

      
        <p className="mt-6 text-sm text-center text-gray-600">
          Dont have an account?{" "}
          <Link href="/register" className="text-main font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

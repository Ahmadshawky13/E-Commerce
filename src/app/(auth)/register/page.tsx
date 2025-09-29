"use client"
import React, { useState } from "react"
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

export default function Register() {
  const [btnLoading, setbtn] = useState<boolean>(true)
  const Route = useRouter()

  const SchemeRegister = z
    .object({
      name: z
        .string()
        .nonempty("Name Required")
        .min(2, "Min character 2")
        .max(15, "Max characters 15"),
      email: z.string().email("Email Invalid").nonempty("Email Required"),
      password: z.string()
  .nonempty("Password Required")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
  ),

      rePassword: z
        .string()
        .nonempty("Confirm Password Required")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Enter Valid Password "
        ),
      phone: z
        .string()
        .nonempty("Phone Required")
        .regex(/^(\+2)?01[0125][0-9]{8}$/, "Enter Valid Phone Number"),
    })
    .refine((obj) => obj.password === obj.rePassword, {
      path: ["rePassword"],
      message: "Confirm Password not match",
    })

  const RegisterForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(SchemeRegister),
  })

  async function handleRegister(values: z.infer<typeof SchemeRegister>) {
    setbtn(false)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
      {
        method: "post",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      }
    )
    const data = await res.json()
    setbtn(true)

    if (data.message == "success") {
      toast.success("Account Created!", { position: "top-center" })
      Route.push("/login")
    } else {
      toast.error(data.message, { position: "top-center" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-2xl font-bold text-center text-main mb-6">
          Create your account
        </h1>

        <Form {...RegisterForm}>
          <form
            className="space-y-5"
            onSubmit={RegisterForm.handleSubmit(handleRegister)}
          >
           
            <FormField
              control={RegisterForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter your name"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           
            <FormField
              control={RegisterForm.control}
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
              control={RegisterForm.control}
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

            
            <FormField
              control={RegisterForm.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Re-enter your password"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <FormField
              control={RegisterForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      placeholder="Enter your phone number"
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            {btnLoading ? (
              <Button className="w-full bg-main text-white rounded-lg shadow-md hover:opacity-90">
                Register
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
          Already have an account?{" "}
          <Link href="/login" className="text-main font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

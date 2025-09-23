"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "src/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [btnLoading, setbtn] = useState<boolean>(true);
  const Route = useRouter();
  const SchemeResetPassword = z.object({
    email: z.email("Email Invaild").nonempty("Email Required"),
    newPassword: z
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Enter Valid Password "
      ),
  });

  const ResetPasswordForm = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemeResetPassword),
  });
  async function handleResetPassword(
    values: z.infer<typeof SchemeResetPassword>
  ) {
    setbtn(false);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await res.json();
    setbtn(true);

    console.log(data);
    if (data.token) {
      Route.push("/login");
    } else {
      toast.error(data.message, { position: "top-center" });
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl bg-main my-5">Login Now</h1>

      <Form {...ResetPasswordForm}>
        <form
          className="space-y-3"
          onSubmit={ResetPasswordForm.handleSubmit(handleResetPassword)}
        >
          <FormField
            control={ResetPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> email </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={ResetPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel> New Password </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {btnLoading ? (
            <Button className="w-full bg-main my-5"> Update </Button>
          ) : (
            <Button type="button" className="w-full bg-main my-5">
              {" "}
              <i className="fa-solid fa-spinner">  Loading </i>{" "}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

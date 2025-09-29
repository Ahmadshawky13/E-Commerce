"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/ui/button";
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
import { checkoutPayment } from "src/OrderAction/OrderAction";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  details: z.string().min(10, "Details must be at least 10 characters"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "Phone must contain only numbers")
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits"),
  city: z.string().min(2, "City is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkoutsession() {
  const { cartId }: { cartId: string } = useParams();

  const shippingForm = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function CheckoutSessionPayment(values: CheckoutFormValues) {
    const data = await checkoutPayment(cartId, values);
    console.log("checkout response", data);

    if (data?.session?.url) {
      window.open(data.session.url, "_self");
    } else {
      console.error("No checkout URL found", data);
    }
  }

  return (
    <div className="w-3/4 mx-auto my-5">
      <h1 className="text-3xl">Check Out Payment</h1>
      <Form {...shippingForm}>
        <form
          className="space-y-1"
          onSubmit={shippingForm.handleSubmit(CheckoutSessionPayment)}
        >
          <FormField
            control={shippingForm.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your shipping details</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={shippingForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your city</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Payment</Button>
        </form>
      </Form>
    </div>
  );
}

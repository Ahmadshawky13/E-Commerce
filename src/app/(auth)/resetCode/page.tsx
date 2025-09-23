"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from 'src/components/ui/button'
import {toast} from 'sonner'
import { useRouter } from 'next/navigation'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
export default function ResetCode() {
    const [btnLoading, setbtn] = useState<boolean>(true);
  
const Route = useRouter()
  const SchemeResetCode = z.object({
    resetCode:z.string().nonempty("Reset Code Reqiured")
  })

  const ResetCodeForm = useForm({
    defaultValues:{
    resetCode:"",
    },
    resolver:zodResolver(SchemeResetCode)
  })
async function handleResetCode(values: z.infer<typeof SchemeResetCode >){
      setbtn(false);

const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`,{
  method:"post",
  body:JSON.stringify(values),
  headers:{"content-type":"application/json"

  }
})
const data = await res.json()
    setbtn(true);

console.log(data);
if(data.status == 'Success'){
Route.push('/resetPassword')
}
else{
  toast.error(data.message,{position:"top-center"})
}

}

    return (
     
      <div className='w-3/4 mx-auto my-5'>
        
      <h1 className='text-3xl bg-main my-5'>Your Email </h1>

      
        <Form {...ResetCodeForm}>

          <form className='space-y-3' onSubmit={ResetCodeForm.handleSubmit(handleResetCode)}>

      
      <FormField
       control={ResetCodeForm.control}
      name="resetCode"
      render={({field}) => (
      <FormItem>
       <FormLabel>  Enter The Code  </FormLabel> 
        <FormControl><InputOTP {...field} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP></FormControl>
        <FormDescription />
        <FormMessage />
       </FormItem>
      )}
     />
      
     {btnLoading ? (
                 <Button className="w-full bg-main my-5"> Verify Code </Button>
               ) : (
                 <Button type="button" className="w-full bg-main my-5">
                   {" "}
                   <i className="fa-solid fa-spinner">  Loading </i>{" "}
                 </Button>
               )}
  </form>
</Form>
</div>
      
    )
  }
  
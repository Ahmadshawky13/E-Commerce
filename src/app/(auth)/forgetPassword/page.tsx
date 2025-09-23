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
export default function ForgetPassword() {
    const [btnLoading, setbtn] = useState<boolean>(true);
  
const Route = useRouter()
  const SchemeForgetPassword = z.object({
    email:z.email("Email Invaild").nonempty("Email Required"),
   
  })

  const forgetPasswordForm = useForm({
    defaultValues:{
    email:"",
    },
    resolver:zodResolver(SchemeForgetPassword)
  })
async function handleForgetPassword(values: z.infer<typeof SchemeForgetPassword >){
      setbtn(false);

const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`,{
  method:"post",
  body:JSON.stringify(values),
  headers:{"content-type":"application/json"

  }
})
const data = await res.json()
    setbtn(true);

console.log(data);
if(data.statusMsg == 'success'){

Route.push('/resetCode')
}
else{
  toast.error(data.message,{position:"top-center"})
}

}

    return (
     
      <div className='w-3/4 mx-auto my-5'>
        
      <h1 className='text-3xl bg-main my-5'>Your Email </h1>

      
        <Form {...forgetPasswordForm}>

          <form className='space-y-3' onSubmit={forgetPasswordForm.handleSubmit(handleForgetPassword)}>

      
      <FormField
       control={forgetPasswordForm.control}
      name="email"
      render={({field}) => (
      <FormItem>
       <FormLabel>  email </FormLabel> 
        <FormControl><Input type='email' {...field}/></FormControl>
        <FormDescription />
        <FormMessage />
       </FormItem>
      )}
     />
      
      {btnLoading ? (
                  <Button className="w-full bg-main my-5"> Send Email </Button>
                ) : (
                  <Button type="button" className="w-full bg-main my-5">
                    {" "}
                    <i className="fa-solid fa-spinner">   Loading </i>{" "}
                  </Button>
                )}
  </form>
</Form>
</div>
      
    )
  }
  
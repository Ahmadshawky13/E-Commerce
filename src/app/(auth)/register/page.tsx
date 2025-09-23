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
export default function Register() {
        const [btnLoading, setbtn] = useState<boolean>(true);
  
const Route = useRouter()
  const SchemeRegister = z.object({
    name:z.string().nonempty("Name Required").min(2,"min character 2").max(15,"max characters 15"),
    email:z.email("Email Invaild").nonempty("Email Required"),
    password:z.string().nonempty("Password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Enter Valid Password "),
    rePassword:z.string().nonempty("rePassword Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Enter Valid Password "),
    phone:z.string().nonempty("Phone Required").regex(/^(\+2)?01[0125][0-9]{8}$/,"Enter Valid Phone Number")
  }).refine((obj)=>{
    return obj.password == obj.rePassword
  },{
    path:['rePassword'],
    error:"Confirm Password not match"
  })

  const RegisterForm = useForm({
    defaultValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    resolver:zodResolver(SchemeRegister)
  })
async function handleRegister(values: z.infer<typeof SchemeRegister >){
          setbtn(false);

const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
  method:"post",
  body:JSON.stringify(values),
  headers:{"content-type":"application/json"

  }
})
const data = await res.json()
          setbtn(true);

console.log(data);
if(data.message == 'success'){
  toast.success("Account Created!",{position:"top-center"})
Route.push('/login')
}
else{
  toast.error(data.message,{position:"top-center"})
}

}

    return (
     
      <div className='w-3/4 mx-auto my-5'>
        
      <h1 className='text-3xl bg-main my-5'>Register Now</h1>

      
        <Form {...RegisterForm}>

          <form className='space-y-3' onSubmit={RegisterForm.handleSubmit(handleRegister)}>

      <FormField
       control={RegisterForm.control}
      name="name"
      render={({field}) => (
      <FormItem>
       <FormLabel>Enter Your Name</FormLabel> 
        <FormControl><Input type='text' {...field}/></FormControl>
        <FormDescription/>
        <FormMessage/>
       </FormItem>
      )}
     />
      <FormField
       control={RegisterForm.control}
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
      <FormField
       control={RegisterForm.control}
      name="password"
      render={({field}) => (
      <FormItem>
       <FormLabel>  password </FormLabel> 
        <FormControl><Input type='password' {...field}/></FormControl>
        <FormDescription />
        <FormMessage />
       </FormItem>
      )}
     />
      <FormField
       control={RegisterForm.control}
      name="rePassword"
      render={({field}) => (
      <FormItem>
       <FormLabel>  rePassword </FormLabel> 
        <FormControl><Input type='password' {...field}/></FormControl>
        <FormDescription />
        <FormMessage />
       </FormItem>
      )}
     />
      <FormField
       control={RegisterForm.control}
      name="phone"
      render={({field}) => (
      <FormItem>
       <FormLabel>  phone </FormLabel> 
        <FormControl><Input type='tel' {...field}/></FormControl>
        <FormDescription />
        <FormMessage />
       </FormItem>
      )}
     />

{btnLoading ? (
                  <Button className="w-full bg-main my-5"> Register </Button>
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
  
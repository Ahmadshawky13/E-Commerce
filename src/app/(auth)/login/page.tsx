"use client"
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from 'src/components/ui/button'
import {toast} from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { getUserToken } from 'src/getUserToken'
import { getCartData } from 'src/CartAction/CartAction'
import { CartData } from 'src/types/cart.type'
import { CountContext } from 'src/CountProvider'
export default function Login() {
      const [btnLoading, setbtn] = useState<boolean>(true);
  
const Route = useRouter()
const countData = useContext(CountContext)
  const Schemelogin = z.object({
    email:z.email("Email Invaild").nonempty("Email Required"),
    password:z.string().nonempty("Password Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Enter Valid Password "),
   
 
  })

  const LoginForm = useForm({
    defaultValues:{
    email:"",
    password:"",
    },
    resolver:zodResolver(Schemelogin)
  })
async function handlelogin(values: z.infer<typeof Schemelogin >){
        setbtn(false);

      const data = await  signIn("credentials",{
          email:values.email,
          password:values.password,
          redirect:false,
          // callbackUrl:'/'  
        }) 
        if (data?.ok){
toast.success("Login success",{position:"top-center"})
const token = await getUserToken()
    if(token){
      const data:CartData = await getCartData()
      let sum:number = 0
      data.data.products.forEach((item)=>{
        sum += Number (item.count)
        countData?.setCount(sum)
      })
    }
Route.push('/')
        } else{
  toast.error(data?.error,{position:"top-center"})
 }
// const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
//   method:"post",
//   body:JSON.stringify(values),
//   headers:{"content-type":"application/json"

//   }
// })
// const data = await res.json()
//       setbtn(true);

// console.log(data);
// if(data.message == 'success'){
//   
// }


}

    return (
     
      <div className='w-3/4 mx-auto my-5'>
        
      <h1 className='text-3xl bg-main my-5'>Login Now</h1>

      
        <Form {...LoginForm}>

          <form className='space-y-3' onSubmit={LoginForm.handleSubmit(handlelogin)}>

      
      <FormField
       control={LoginForm.control}
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
       control={LoginForm.control}
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
      <Link href={'/forgetPassword'}> Forget Password? click here </Link>

{btnLoading ? (
                  <Button className="w-full bg-main my-5"> Login </Button>
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
  
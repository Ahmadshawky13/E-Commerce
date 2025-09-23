'use client'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { AddProductToCart } from 'src/CartAction/CartAction'
import { Button } from 'src/components/ui/button'
import { CountContext } from 'src/CountProvider'

export default function AddCartBtn({id}: {id:string}) {
  const countData = useContext(CountContext)
   async function addProduct(id:string){
      try{const data = await  AddProductToCart(id)
      if (data.status == 'success'){
        toast.success(data.message, {position:"top-center"})
        let sum:number = 0
      data.data.products.forEach((item: { count: number })=>{
        sum += Number (item.count)
        countData?.setCount(sum)
      })
      } else{
        toast.error("Incorrect Item", {position:"top-center"})
      }
    } catch(err){
      toast.error("cant add product to the cart without login !" , {position:"top-center"})
    }
    }
  return (
    <Button onClick={()=>addProduct(id)} className='bg-main w-full rounded-3xl cursor-pointer'> Add To Cart </Button>
  )
}

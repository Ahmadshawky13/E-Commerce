import React from 'react'
import ProductDeailsCard from 'src/app/_component/ProductDetailsCard/ProductDeailsCard'
import { ProductDetails, ProductItem } from 'src/types/productsDetails.type'

export default async function page({params}:{params:{id:string }}) {
    const {id}= await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL   }/api/v1/products/${id}`)
    const data:ProductDetails = await res.json()
    const product:ProductItem = data.data   
  return (
    <div>
        <ProductDeailsCard product={product}/>
    </div>
  )
}

import Image from 'next/image';
import React from 'react'
import { Button } from 'src/components/ui/button';
import { ProductItem } from 'src/types/productsDetails.type';
import ProductSlider from '../ProductSlider/ProductSlider';
import AddCartBtn from '../AddBtn/AddCartBtn';

export default function ProductDeailsCard({product}:{product:ProductItem}) {
        const {imageCover , title , ratingsAverage , price ,category:{name}, _id , description, images} = product

  return (
    <div className='w-4/5 m-auto'>
         <div className="grid grid-cols-12 gap-24 items-center">
            <div className="col-span-4">
     {/* <Image src={imageCover} alt={title} width={200} height={100} className='w-full object-cover rounded-2xl'/> */}
              <ProductSlider images={images}/>  
            </div>
            <div className="col-span-8">
                <h1>{title}</h1>
                <p>{description}</p>
                <h5 className='text-main my-10'>{name}</h5>
                <div className="flex justify-between items-center">
        <span>{price}EGP</span>
        <span><i className='fa-solid fa-star rating-color'></i> {ratingsAverage}</span>
    </div>
    <AddCartBtn id={_id}/>
            </div>
         </div>
    </div>
  )
}

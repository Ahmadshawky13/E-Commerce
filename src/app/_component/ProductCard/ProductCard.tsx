'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from 'src/types/products.type';
import AddCartBtn from '../AddBtn/AddCartBtn';
import Link from 'next/link';
import AddWishlistBtn from '../WishlistButton/WishlistButton';

export default function ProductCard({product}:{product:product}) {
  const { imageCover, title, ratingsAverage, price, category:{name}, _id, description } = product;

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between relative w-full sm:w-auto">

      {/* رابط الكارد */}
      <Link href={`/products/${_id.toString()}`}>
        <CardHeader className="p-0 relative">
          <Image 
            src={imageCover} 
            alt={title} 
            width={400} 
            height={250} 
            className="w-full h-48 sm:h-56 md:h-64 lg:h-64 object-cover object-center rounded-t-2xl"
          />

          {/* زرار القلب */}
          <div 
            className="absolute top-2 right-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <AddWishlistBtn id={_id.toString()} />
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-1">
          <CardTitle className="text-main text-lg truncate">{name}</CardTitle>
          <CardTitle className="text-gray-700 text-sm truncate">
            {title.split(" ").slice(0,3).join(" ")}
          </CardTitle>   

          {/* الوصف مختصر */}
          <CardDescription className="text-gray-500 text-xs line-clamp-2">
            {description}
          </CardDescription>

          <div className="flex justify-between items-center text-sm font-medium mt-1">
            <span className="text-green-600 text-base font-semibold">{price} EGP</span>
            <span className="flex items-center gap-1 text-yellow-500">
              <i className='fa-solid fa-star'></i> {ratingsAverage}
            </span>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 border-t mt-auto flex justify-center">
        <AddCartBtn id={_id.toString()} />
      </CardFooter>
    </Card>
  )
}

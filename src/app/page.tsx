import Image from "next/image";
import { product, ProductData } from "src/types/products.type";
import ProductCard from "./_component/ProductCard/ProductCard";
import MainSlider from "./_component/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeLoading } from "./_component/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data:ProductData = await res.json()
  const productList:product[] =data.data

  return (
     <>
     <MainSlider/>
      <h1>Home</h1>
     <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
     <Suspense fallback={<HomeLoading/>}>
{
      productList.map((product)=>{
        return <ProductCard key={product._id} product={product}/>
      })
     }
     </Suspense>
     </div>
     </>
  );
}

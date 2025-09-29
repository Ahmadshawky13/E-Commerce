import Image from "next/image";
import { product, ProductData } from "src/types/products.type";
import ProductCard from "./_component/ProductCard/ProductCard";
import MainSlider from "./_component/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeLoading } from "./_component/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`);
  const data: ProductData = await res.json();
  const productList: product[] = data.data;

  return (
    <>
      <MainSlider />
      <h1 className="text-2xl font-bold my-6 text-center">Our Products</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-4">
        <Suspense fallback={<HomeLoading />}>
          {productList.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </Suspense>
      </div>
    </>
  );
}

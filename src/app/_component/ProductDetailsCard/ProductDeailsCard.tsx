import React from 'react'
import { ProductItem } from 'src/types/productsDetails.type';
import ProductSlider from '../ProductSlider/ProductSlider';
import AddCartBtn from '../AddBtn/AddCartBtn';

export default function ProductDeailsCard({ product }: { product: ProductItem }) {
  const { title, ratingsAverage, price, category: { name }, _id, description, images } = product;

  return (
    <div className="w-11/12 md:w-4/5 m-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        
        <div className="md:col-span-5">
          <ProductSlider images={images} />
        </div>

       
        <div className="md:col-span-7 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          <h5 className="text-main font-medium">{name}</h5>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>{price} EGP</span>
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-400"></i> {ratingsAverage}
            </span>
          </div>

          <div className="mt-4">
            <AddCartBtn id={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

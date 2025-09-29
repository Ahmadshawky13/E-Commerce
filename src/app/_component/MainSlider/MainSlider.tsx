'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 my-6 w-full px-4 lg:px-0">
      
      <div className="w-full lg:w-4/5">
        <Slider {...settings}>
          {[1,2,3].map((i) => (
            <div key={i} className="relative flex justify-center items-center">
              <Image
                src={`/images/slider-image-${i}.jpeg`}
                alt={`slider-${i}`}
                width={1000}
                height={1000}
                className="w-full h-64 sm:h-80 md:h-96 lg:h-96 object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>
      </div>

      
      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-1/5">
        {[1,2].map((i) => (
          <div key={i} className="flex-1 relative">
            <Image
              src={`/images/slider-image-${i}.jpeg`}
              alt={`side-${i}`}
              width={500}
              height={500}
              className="w-full h-32 sm:h-40 md:h-48 lg:h-47 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

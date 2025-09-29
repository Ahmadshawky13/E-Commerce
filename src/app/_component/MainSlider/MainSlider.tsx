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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-6">
      {/* Main Slider */}
      <div className="lg:col-span-10">
        <Slider {...settings}>
          <div>
            <Image
              src="/images/slider-image-1.jpeg"
              alt="img1"
              width={1000}
              height={1000}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-2.jpeg"
              alt="img2"
              width={1000}
              height={1000}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-3.jpeg"
              alt="img3"
              width={1000}
              height={1000}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
            />
          </div>
        </Slider>
      </div>

      {/* Side Images */}
      <div className="lg:col-span-2 flex lg:flex-col gap-4">
        <Image
          src="/images/slider-image-1.jpeg"
          alt="img-side-1"
          width={500}
          height={500}
          className="w-full h-40 sm:h-48 object-cover rounded-xl"
        />
        <Image
          src="/images/slider-image-2.jpeg"
          alt="img-side-2"
          width={500}
          height={500}
          className="w-full h-40 sm:h-48 object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

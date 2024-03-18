import React, { useState } from "react";
import Slider from "react-slick";
import { BestSeller } from "./Data";
import ProductCard from "./ProductCard";

const HomeBestSeller = () => {
  let [tooltip, settooltip] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
        speed: 2000,
        arrows:false,
        autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div className="xl:min-h-[92vh] py-5 bg-slate-100">
      <div className="my-auto mx-auto">
        <h3 className="poppins fw-bold text-center">Best Sellers</h3>
        <p className="text-center">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered
        </p>
        {/* Card */}
        <Slider {...settings} className=" container mx-auto my-5 p-2">
          {BestSeller.map((value) => {
            return (
             <ProductCard value={value}/>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default HomeBestSeller;

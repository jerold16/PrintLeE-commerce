import React, { useContext } from "react";
import Slider from "react-slick";
import { categories } from "./Data";
import { Storage } from "../Context/StateStore";

const HomeCategory = () => {
  const {Allcaetgory}=useContext(Storage)
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
        speed: 2000,
        arrows:"false",
        autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <div className="flex flex-col min-h-[90vh] ">
      {
        Allcaetgory!=undefined ? <>  
    <div className="flex  flex-wrap gap-3 justify-around my-auto">
        <div className="flex  items-center poppins fw-semibold gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg> Delivery Available All over India
        </div>
        <div  className="flex  items-center poppins fw-semibold gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
</svg> 30 days online returns
        </div>
        <div  className="flex  items-center poppins fw-semibold gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-headset" viewBox="0 0 16 16">
  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
</svg>30 days online returns
        </div>
        <div  className="flex  items-center poppins fw-semibold gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
  <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
  <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
</svg> Low Price in the market
        </div>

    </div>
    {/* Rating */}
    <div className="xl:min-h-[74vh] my-10 xl:my-0">
    <div className="w-fit my-5 flex flex-col flex-sm-row flex-wrap gap-2 items-center poppins mx-auto">
      <p className="fw-semibold w-fit mx-auto mb-0">Great</p> 
      <img className="w-24 h-fit" src={require('../Assest/rating (2).png')} alt="" />
      <p className="mb-0">2,564 reviews from the costumer</p>
    </div>
    
    <div className="container px-5">
      <Slider {...settings} className=" my-5">
        {Allcaetgory.map((data) => {          
          return (
            <div style={{backgroundColor:'rgb(218,52,246)'}}
            className="cursor-pointer w-100   rounded-3xl relative
             h-[20rem] hover:scale-105 shadow-xl transition duration-500 border-1 overflow-hidden  flex ">
              <img src={data.image} className="w-100 h-[20rem]  object-contain rounded-3xl" alt="image" />
            <div className="absolute  bg-transparent flex flex-col  justify-end p-6 top-0 w-100 h-100 ">
             
              <button className="px-4 w-fit p-3 bg-violet-500 text-slate-50 rounded-full">Explore more </button>
            </div>
             </div>
          );
        })}
        
      </Slider>

    </div>
    </div>
    </> : ""
      }
    </div>
  );
};

export default HomeCategory;

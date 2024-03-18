import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";

const HomeBanner = () => {
  let carousel = [
    {
      heading: "Hold it together",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, saepe?",
      img: "../Assest/pics-02.png",
      img2:'../Assest/pics-01.png',
      img3:'../Assest/pics-04.png',
      img4:'../Assest/png1.png'
    },
    {
        heading: "Hold it together",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, saepe?",
          img: "../Assest/pics-02.png",
          img2:'../Assest/pics-01.png',
          img3:'../Assest/pics-04.png',
          img4:'../Assest/png1.png'
      },
  ];

  return (
    <div className=" bg-blue-200 ">
      <Carousel>
        {carousel.map((data) => {
          return (
            <Carousel.Item>
              <Row className="min-h-[80vh] lg:min-h-[50vh] xl:min-h-[90vh] container mx-auto ">
                {/* Text content */}
                <Col lg={6} className="fade-in-up  flex flex-col ">
                    
                <div className="w-[50px] shake h-[50px] z-0 relative top-8 lg:top-14 rounded-full bg-blue-700 "></div>
                  <div className="my-auto h-fit mx-auto">
                    <h2 className="fw-bold display-1 poppins lg:pe-10">{data.heading} </h2>
                    <p className="">{data.content}
                    </p>
                    <button className="text-white bg-violet-700 hover:bg-slate-900 transition duration-500 p-3 px-5 rounded-s-full rounded-e-full">
                      Show now
                    </button>
                    <div className="w-[50px] shake h-[50px] absolute bottom-20 right-20 rounded-full bg-blue-700 "></div>
                  </div>
                </Col>
                <Col lg={6} className="flex ">
                  <div className="relative  w-100 ">
                    <div
                      style={{ backgroundColor: "rgba(29,90,252,0.7)" }}
                      className="w-[300px] z-0 zoomin h-[300px] absolute bottom:39 lg:top-32 right-36
                                  rounded-full">
                    </div>
                    {/* <div className="z-10 flex flex-wrap gap-4 justify-between "> */}
                      {/* <img className="rotate-45  w-60"
                        src={data.img}
                        alt="image"/>
                      <img  className="rotate-45  w-72" 
                      src={data.img2} alt="image 2" />
                      <img className="-rotate-45  w-60"
                        src={data.img3}
                        alt="image"/>
                      <img  className="-rotate-45  w-72" 
                      src={data.img4} alt="image 2" />
                    </div> */}
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeBanner;

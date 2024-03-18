import React, { useState } from "react";
import NavBar from "../Component/NavBar";
import { useParams } from "react-router";
import TitleBanner from "../Component/TitleBanner";
import { Carousel, Col, Row } from "react-bootstrap";
import Footer from "../Component/Footer";
import RelatedProduct from "./RelatedProduct";

const ProductPage = () => {
  let { name } = useParams();
  let [quantity, setquantity] = useState(1);
  return (
    <section id="home" className="bg-slate-100">
      <NavBar />
      <TitleBanner name={name} />
      <Row className="container justify-around  mx-auto py-5">
        <Col lg={5} className="bg-slate-50 my-3 rounded-3xl shadow">
          <img
            className="w-full h-full object-cover "
            src={require("../Assest/pics-02.png")}
            alt="productImage"
          />
        </Col>
        <Col lg={6} className="my-3">
          <p className="text-green-400 fw-semibold poppins uppercase ">
            IN Stock
          </p>
          <h5 className="fw-bold text-3xl xl:text-4xl">Product</h5>
          <div className="flex gap-2 items-center">
            <img
              className="w-20 h-fit"
              src={require("../Assest/rating (2).png")}
              alt="Rating"
            />
            (5 reviews)
          </div>

          <p className="fw-bold my-3 text-2xl">Price : 123 </p>
          <hr />
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </p>
          <div className="flex flex-wrap flex-sm-nowrap  gap-3 fw-bold">
            <div className="p-2 bg-slate-300 mx-auto flex items-center gap-3 rounded-full ">
              <button
                onClick={() => {
                  setquantity((prev) => {
                    if (prev == 1) return 1;
                    else return (prev -= 1);
                  });
                }}
                className="mb-0 cursor-pointer h-fit rounded-full w-8 p-1 text-center hover:bg-slate-50"
              >
                -
              </button>
              <p className="mb-0 w-10 mx-auto text-center"> {quantity}</p>
              <button
                onClick={() => setquantity((prev) => (prev += 1))}
                className="mb-0  h-fit rounded-full  cursor-pointer w-8 p-1 text-center hover:bg-slate-50"
              >
                +
              </button>
            </div>
            <button className="p-2 w-full px-3 order-2 order-sm-0  rounded-full bg-slate-950 text-slate-50  hover:bg-purple-700">
              Add to cart
            </button>
            <button className="p-2 px-3 mx-auto order-1  order-sm-0 rounded-full bg-purple-700 text-slate-50 w-32 ">
              Personalize
            </button>
          </div>
          {/* Wishlist */}
          <div className="my-4 cursor-pointer flex items-center gap-2 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-star"
              viewBox="0 0 16 16"
            >
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            Add to Wishlist
          </div>
          <hr />
        </Col>
      </Row>
      <RelatedProduct />
      <Footer/>
    </section>
  );
};

export default ProductPage;

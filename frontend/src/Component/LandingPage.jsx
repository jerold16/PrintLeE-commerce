import React, { Suspense, lazy } from "react";
import NavBar from "./NavBar";
import HomeBanner from "./HomeBanner";
import HomeCategory from "./HomeCategory";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner } from "react-bootstrap";
import HomeBestSeller from "./HomeBestSeller";
import HomeOffer from "./HomeOffer";
import Homedummy from "./Homedummy";
import Footer from "./Footer";
import HomeDummy2 from "./HomeDummy2";
const LandingPage = () => {
  const Lazybanner = lazy(() => import("./HomeBanner"));
  return (
    <section id="home">
      <NavBar />
      <Suspense
        fallback={
          <div className="flex mx-auto w-fit h-[100vh] my-auto align-items-center">
            <Spinner animation="border" />
          </div>
        }
      >
        <Lazybanner />
      </Suspense>
      <HomeCategory />
      <HomeOffer/>
      <HomeBestSeller/>
      <Homedummy/>
      <HomeDummy2/>
      <Footer/>
    </section>
  );
};

export default LandingPage;

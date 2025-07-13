import React from "react";
import TrendingPackages from "./HomeSection/TrendingPackages";
import PackageMarketplace from "../components/PackageMarketplace";
import WnatToGOForm from "../components/WnatToGOForm";
import HeroSection from "./HomeSection/HeroSection";
import PopularPackages from "../components/PopularPackages";
import TopDestinations from "./HomeSection/TopDestionation";
import TrandingStories from "./HomeSection/TrandingStories";
import TopCountries from "./HomeSection/TopCountries";
import OfferCards from "./HomeSection/OfferCard";
import HowItWork from "./HomeSection/HowItWork";
import Banner from "./HomeSection/Banner";
import AboutSection from "./HomeSection/AboutSection";

const Home = () => {
  return (
    <div className="">
      {/* <HeroSection /> */}
      <Banner/>
      <div className="md:mx-80">
        <WnatToGOForm />
      </div>
<AboutSection/>
      <OfferCards />
      <PopularPackages />
      <TopDestinations />
      <TrandingStories />
      <TopCountries />
      <TrendingPackages />
      <PackageMarketplace />
      <HowItWork/>
    </div>
  );
};

export default Home;

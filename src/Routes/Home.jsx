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

const Home = () => {
  return (
    <div className="mt-12">
      <HeroSection />
      <div className="md:mx-80">
        <WnatToGOForm />
      </div>

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

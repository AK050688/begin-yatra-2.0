import React, { useState, useEffect } from "react";
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
import api from "../Api/ApiService";

const Home = () => {
  const [homeData, setHomeData] = useState({
    totalPopularDestination: [],
    totalTrandingDestination: [],
    totalTrandingPackages: [],
    domesticDestinations: [],
    internationalDestinations: [],
  });
  const [loading, setLoading] = useState(false);

  const getAllHomeData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/auth/homepage");
      console.log("res.data Home data", res.data);

      if (res.data.statusCode === 200) {
        setHomeData({
          totalPopularDestination: res.data.data.totalPopularDestination || [],
          totalTrandingDestination:
            res.data.data.totalTrandingDestination || [],
          totalTrandingPackages: res.data.data.totalTrandingPackages || [],
          totalTopCountries: res.data.data.totalTopCountries || [],
        });

        console.log("Home data set:", res.data.data);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllHomeData();
  }, []);

  return (
    <div className="">
      {/* <HeroSection /> */}
      <Banner />
      <AboutSection />
      <OfferCards />
      <PopularPackages
        popularDestinations={homeData.totalPopularDestination}
        loading={loading}
      />
      <TopDestinations
        trendingDestinations={homeData.totalTrandingDestination}
        loading={loading}
      />
      <TrandingStories />
      <TopCountries
        totalTopCountries={homeData.totalTopCountries}
        loading={loading}
      />
      <TrendingPackages
        trendingPackages={homeData.totalTrandingPackages}
        loading={loading}
      />
      <div className="mx-auto bg-white">
        <WnatToGOForm />
      </div>
      <PackageMarketplace />
      <HowItWork />
    </div>
  );
};

export default Home;

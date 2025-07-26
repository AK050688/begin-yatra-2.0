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
        internationalDestinations: []
    });
    const [loading, setLoading] = useState(false);

    const getAllHomeData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/auth/homepage");
            console.log("res.data Home data", res.data);

            if (res.data.statusCode === 200) {
                const allDestinations = res.data.data.totalPopularDestination || [];
                
                // Filter destinations by type
                const domesticDestinations = allDestinations.filter(destination => 
                {
                    if( destination.destinationType === "domestic") {
                        return "India";
                    }
                }
                );
                
                const internationalDestinations = allDestinations.filter(destination => 
                {
                    if (destination.destinationType === "international") {
                        return destination.destinationName;
                    }
                }
                );

                setHomeData({
                    totalPopularDestination: res.data.data.totalPopularDestination || [],
                    totalTrandingDestination: res.data.data.totalTrandingDestination || [],
                    totalTrandingPackages: res.data.data.totalTrandingPackages || [],
                    domesticDestinations: domesticDestinations,
                    internationalDestinations: internationalDestinations
                });

                console.log("Home data set:", res.data.data);
                console.log("Domestic destinations:", domesticDestinations);
                console.log("International destinations:", internationalDestinations);
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
            <Banner/>
            <AboutSection/>
            <OfferCards/>
            <PopularPackages popularDestinations={homeData.totalPopularDestination} loading={loading} />
            <TopDestinations trendingDestinations={homeData.totalTrandingDestination} loading={loading} />
            <TrandingStories/>
            <TopCountries domesticDestinations={homeData.domesticDestinations} internationalDestinations={homeData.internationalDestinations} loading={loading} />
            <TrendingPackages trendingPackages={homeData.totalTrandingPackages} loading={loading} />
            <div className="mx-auto lg:max-w-6xl md:max-w-4xl max-w-2xl xs:max-w-xs">
                <WnatToGOForm/>
            </div>
            <PackageMarketplace/>
            <HowItWork/>
        </div>
    );
};

export default Home;

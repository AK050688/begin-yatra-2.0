import React from "react";
import BestPakages from "./HomeSection/BestPakages";
import TrendingPackages from "./HomeSection/TrendingPackages";
import PackageMarketplace from "../components/PackageMarketplace";
import WnatToGOForm from "../components/WnatToGOForm";


const Home = () => {
  return (
    <div>
 
      <BestPakages/>
      <TrendingPackages/>
      <PackageMarketplace/>
      <WnatToGOForm/>
    </div>
  );
};

export default Home;

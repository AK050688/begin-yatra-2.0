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
      <div className="mx-80">
      <WnatToGOForm/></div>
    </div>
  );
};

export default Home;

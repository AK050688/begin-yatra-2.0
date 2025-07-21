import React from "react";
import Banner from "./Banner";
import LatestLeads from "./LatestLeads";
import GenerateTravelleads from "./GenerateTravelleads";
import Teravelleads from "./Teravelleads";
import WhatOurUsersSay from "./WhatOurUsersSay";
import Partners from "./Partners";
import Footer from "../HaderFooter/Footer";
import TopDestinations from "./TopDistination";

const Agent = () => {
  return (
    <>
      <Banner />
      <LatestLeads />
      <Teravelleads title={"Categories of Travel leads"} />
      <div className="">
        <Teravelleads title={" Types of Travel Leads"} />
      </div>
      <div className="">
        <Teravelleads title={"How to generate travel leads?"} />
      </div>
      <GenerateTravelleads />
      <WhatOurUsersSay/>
      <Partners/>
      <TopDestinations/>
      <Footer/>
    </>
  );
};

export default Agent;

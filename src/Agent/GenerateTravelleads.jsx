import React from "react";


const GenerateTravelleads = () => {
  const travelLeads = [
    {
      title: "What are travel leads",
      para:
        "Travel lead is a requirement of a traveler to go on a leisure trip. If a requirement answers these 4 questions (When, Where, How many people, For how long), we call it a travel lead. A lead becomes a customer when there is a confirmed booking.",
    },
    {
      title: "Who generates travel leads?",
      para:
        "Every travel company generates travel leads. A travel lead is created when a traveler begins researching online. This happens through enquiry forms on websites or ads on Facebook/Google.",
    },
    {
      title: "Who is a travel lead aggregator",
      para:
        "Small travel agents often rely on 'Travel Lead Aggregators' who connect travelers with local agents. TripClap is one such aggregator that helps agents get leads from across India via internet marketing.",
    },
    {
      title: "How to buy a travel lead from a travel leads aggregator?",
      para:
        "Travel agents can buy leads through subscription models, paying a fixed monthly/annual fee. This gives access to a fixed number of leads but with limited selection.",
    },
    {
      title: "Difference between a travel lead and a travel booking",
      para:
        "A travel lead is pre-booking data, while a travel booking is confirmed with payment. Bookings include full travel and payment details.",
    },
    {
      title: "What is the best time to generate travel leads?",
      para:
        "It depends on the destination’s seasonality. Companies targeting multiple destinations generate leads year-round. For specific locations, leads are seasonal.",
    },
  ];

  return (
    <div className="py-16 px-4 bg-white">
      {/* Section Title */}
 

      {travelLeads.map((data, index) => (
  <div
    key={index}
    className=" max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 p-4 md:p-6 bg-gray-50 rounded-xl shadow-sm"
  >
    <img
      src="/Images/about.png"
      alt="about"
      className="w-full md:w-1/2 h-auto rounded-md object-cover"
    />
    <div className="flex-1 space-y-3">
      <h5 className="text-xl md:text-2xl font-semibold text-gray-800">{data.title}</h5>
      <p className="text-gray-600 text-sm leading-relaxed">{data.para}</p>

      <button className="mt-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-medium rounded-md hover:from-blue-600 hover:to-sky-500 transition">
        Try it Free
      </button>
    </div>
  </div>
))}
    </div>
  );
};

export default GenerateTravelleads;
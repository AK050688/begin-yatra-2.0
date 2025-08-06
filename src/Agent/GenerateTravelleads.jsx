// import React from "react";

// const GenerateTravelleads = () => {
//   const travelLeads = [
//     {
//       title: "Travel Agent Should Cares ",
//       img: "/Images/travelagent.jpeg",
//       para: "We work with travel agents and agencies around the world to deliver unforgettable travel experiences. Whether you specialize in group tours, luxury getaways, or custom vacations, our platform gives you the tools, support, and commissions you need to succeed",
//     },
//     {
//       title: " What You’ll Get as a Agent",
//       img: "/Images/agentimg2.png",
//       para: (
//         <ul className="list-disc">
//           <li>High Commissions: Earn top-tier rates for every booking.</li>
//           <li>
//             Agent Portal Access: Manage quotes, bookings, payments, and
//             itineraries in one place.
//           </li>
//           <li>
//             Real-Time Inventory: Access to live pricing and availability for
//             flights, hotels, tours, cruises, and transfers.
//           </li>
//           <li>
//             Exclusive Deals: Unlock B2B-only promotions and last-minute
//             discounts.
//           </li>
//         </ul>
//       ),
//     },
//     {
//       title: "Who is a travel lead aggregator",
//       img: "/Images/agentimg4.jpg",
//       para: "Small travel agents often rely on 'Travel Lead Aggregators' who connect travelers with local agents. TripClap is one such aggregator that helps agents get leads from across India via internet marketing.",
//     },
//     {
//       title: "How to buy a travel Agent fro Trip?",
//       img: "/Images/agentimg3.jpg",
//       para: "Travel agents can buy through subscription models, paying a fixed monthly/annual fee. ",
//     },
//   ];

//   return (
//     <div className="py-16 bg-white">
//       {/* Section Title */}

//       {travelLeads.map((data, index) => (
//         <div
//           key={index}
//           className=" max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 m-4 p-4 md:p-4 bg-gray-50 rounded-xl shadow-sm"
//         >
//           <img
//             src={data.img}
//             alt="about"
//             className="w-full md:w-1/2 h-auto rounded-md object-cover "
//           />
//           <div className="flex-1 space-y-3">
//             <h5 className="text-xl md:text-2xl font-semibold text-gray-800">
//               {data.title}
//             </h5>
//             <p className="text-gray-600 text-sm leading-relaxed">{data.para}</p>

//             <button className="mt-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-sky-400 text-white font-medium rounded-md hover:from-blue-600 hover:to-sky-500 transition">
//               Try it Free
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GenerateTravelleads;

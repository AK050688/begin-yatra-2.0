import React from "react";

const dummyTrendingPackages = [
  { id: 1, name: "Maldives Luxury Escape", price: "$999", description: "5 nights in a water villa with all meals included." },
  { id: 2, name: "Dubai Adventure", price: "$799", description: "Desert safari, city tour, and shopping extravaganza." },
  { id: 3, name: "Singapore Family Fun", price: "$699", description: "Universal Studios, Sentosa, and more for the family." },
];

const TrendingPackages = () => (
  <div style={{ padding: 24 }}>
    <h1>Trending Packages</h1>
    <ul>
      {dummyTrendingPackages.map(pkg => (
        <li key={pkg.id} style={{ marginBottom: 16 }}>
          <h2>{pkg.name}</h2>
          <p>{pkg.description}</p>
          <strong>{pkg.price}</strong>
        </li>
      ))}
    </ul>
  </div>
);

export default TrendingPackages; 
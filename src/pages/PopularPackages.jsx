import React from "react";

const dummyPackages = [
  { id: 1, name: "Goa Beach Escape", price: "$299", description: "Enjoy the sunny beaches of Goa for 3 nights and 4 days." },
  { id: 2, name: "Kashmir Paradise", price: "$499", description: "Experience the beauty of Kashmir with a 5-day tour." },
  { id: 3, name: "Rajasthan Heritage", price: "$399", description: "Explore forts and palaces in Rajasthan for 4 nights." },
];

const PopularPackages = () => (
  <div style={{ padding: 24 }}>
    <h1>Popular Packages</h1>
    <ul>
      {dummyPackages.map(pkg => (
        <li key={pkg.id} style={{ marginBottom: 16 }}>
          <h2>{pkg.name}</h2>
          <p>{pkg.description}</p>
          <strong>{pkg.price}</strong>
        </li>
      ))}
    </ul>
  </div>
);

export default PopularPackages; 
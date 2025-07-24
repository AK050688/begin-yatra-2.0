import React from "react";

const dummyCountries = [
  { id: 1, name: "India", description: "Diverse culture, heritage, and landscapes." },
  { id: 2, name: "Thailand", description: "Beautiful beaches and vibrant street life." },
  { id: 3, name: "Switzerland", description: "Famous for its mountains and scenic beauty." },
];

const TopCountries = () => (
  <div style={{ padding: 24 }}>
    <h1>Top Countries</h1>
    <ul>
      {dummyCountries.map(country => (
        <li key={country.id} style={{ marginBottom: 16 }}>
          <h2>{country.name}</h2>
          <p>{country.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default TopCountries; 
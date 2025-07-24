import React from "react";

const dummyDestinations = [
  { id: 1, name: "Goa", description: "Famous for its beaches and vibrant nightlife." },
  { id: 2, name: "Manali", description: "A beautiful hill station in Himachal Pradesh." },
  { id: 3, name: "Jaipur", description: "The Pink City, known for its rich history and culture." },
];

const TopDestinations = () => (
  <div style={{ padding: 24 }}>
    <h1>Top Destinations</h1>
    <ul>
      {dummyDestinations.map(dest => (
        <li key={dest.id} style={{ marginBottom: 16 }}>
          <h2>{dest.name}</h2>
          <p>{dest.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default TopDestinations; 
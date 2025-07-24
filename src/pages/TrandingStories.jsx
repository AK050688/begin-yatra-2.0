import React from "react";

const dummyStories = [
  { id: 1, title: "A Magical Trip to Goa", author: "Priya S.", content: "We had an amazing time exploring the beaches and nightlife!" },
  { id: 2, title: "Snowy Adventures in Manali", author: "Rahul K.", content: "The snow-capped mountains were breathtaking." },
  { id: 3, title: "Royal Rajasthan", author: "Anjali M.", content: "Loved the forts and palaces, a must-visit!" },
];

const TrandingStories = () => (
  <div style={{ padding: 24 }}>
    <h1>Trending Stories</h1>
    <ul>
      {dummyStories.map(story => (
        <li key={story.id} style={{ marginBottom: 16 }}>
          <h2>{story.title}</h2>
          <p><em>by {story.author}</em></p>
          <p>{story.content}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default TrandingStories; 
// components/ShimmerCard.jsx
import React from 'react';

const TopContainerShimmerCard = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-2xl p-5 shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-300 rounded-full h-10 w-10"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
    </div>
  );
};

export default TopContainerShimmerCard;

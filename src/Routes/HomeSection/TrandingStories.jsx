import React from 'react'
import PopularPackages from '../../components/PopularPackages'

const StoriesData=[
  {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
  {
    img:"/Images/kashmir.jpg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },  
  {
    img:"/Images/goa.jpeg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
    {
    img:"/Images/kashmir.jpg",
    reviews:"Top 10 Thins to do Durgapur",
    numOfView:325
  },
]

const TrandingStories = () => {
  return (
    <div>{/* Trending Stories */}
<section className="px-4 md:px-12 py-10 bg-white">
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
    <span>Our Trending </span>
    Stories on<span className="text-[#3b82f6]"> Begin Yatra </span>
  </h2>

  <div className="flex flex-col lg:flex-row gap-6">
   
    <img
      src="/Images/img.webp"
      alt="img"
      className="w-full lg:w-1/2 h-64 sm:h-96 lg:h-auto object-cover rounded-lg"
    />

    
    <div className="flex flex-col gap-4 w-full">
      {StoriesData.map((data, index) => (
        <div key={index} className="flex bg-white shadow-sm rounded-lg overflow-hidden">
          <img src={data.img} alt="Story" className="h-36 w-36 object-cover" />
          <div className="p-4 flex flex-col justify-between">
            <h2 className="text-md text-black font-semibold">{data.reviews}</h2>
            <p className="text-sm text-gray-600">Number of viewers: <span className="font-medium">{data.numOfView}</span></p>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-2">
        <button className="text-sm text-[#3b82f6] underline">View more story</button>
      </div>
    </div>
  </div>
</section> 

{/* Top Countries */}
{/* <section className="px-4 md:px-12 py-10">
  <h1 className="text-2xl md:text-3xl font-bold mb-6">
    Top <span className="text-[#3b82f6]">Countries</span> you can explore
  </h1>
  <PopularPackages/>
</section> */}

</div>
  )
}

export default TrandingStories
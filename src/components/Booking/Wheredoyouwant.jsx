import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const PopularDestination=[{name:"gojo",img:"/Images/gojo.jpg"},{name:"gojo",img:"/Images/gojo.jpg"},{name:"gojo",img:"/Images/gojo.jpg"},{name:"gojo",img:"/Images/gojo.jpg"},]

const Wheredoyouwant = () => {
  const [location, setLocation] = useState({
    from: "Noida",
    to: ""
  });

  const navigate =useNavigate()

  

  return (
    <div className='flex flex-col px-12 py-4 items-center justify-center'>
      <h4 className='text-2xl font-semibold'>Where do you want to go?</h4>

      <div className="flex flex-col gap-6 mt-10 w-full max-w-md">
        {/* From Input */}
        <div className="border border-gray-300 h-12 rounded-xl px-3 flex items-center">
          <MdOutlineLocationOn className='text-2xl text-gray-400' />
          <label htmlFor="from" className='px-3 text-gray-400 whitespace-nowrap'>Going from</label>
          <input
            id="from"
            type="text"
            value={location.from}
            onChange={(e) =>
              setLocation({ ...location, from: e.target.value })
            }
            placeholder="Enter starting location"
            className='flex-1 border-0 outline-0 bg-transparent'
          />
        </div>

        <div className="border border-gray-300 h-12 rounded-xl px-3 flex items-center">
          <CiSearch className='text-2xl text-gray-500' />
          <input
            type="text"
            value={location.to}
            onChange={(e) =>
              setLocation({ ...location, to: e.target.value })
            }
            placeholder="Where do you want to go"
            className='flex-1 pl-4 border-0 outline-0 bg-transparent'
          />
        </div>
      </div>
      <div className="flex m-10 gap-8 justify-start flex-col">
<p className='text-2xl font-bold '>Popular Destinations</p>
<div className="flex gap-4">
  {PopularDestination.map((place, i) => (
    <div key={i}>
      <div
        className="w-60 h-72 rounded-2xl bg-no-repeat bg-cover bg-center flex items-end p-4 text-white"
        style={{ backgroundImage: `url(${place.img})` }}
      >
        <p className="bg-black/50 px-2 py-1 rounded">{place.name}</p>
      </div>
    </div>
  ))}
</div>

      </div>
      <div className="flex justify-end w-full px-20"><button onClick={()=>navigate('/*select-date')} className="btn btn-primary">Next</button></div>
    </div>
  );
};

export default Wheredoyouwant;

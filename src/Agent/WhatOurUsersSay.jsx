
import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const leadsData = [         
  {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit, vero temporibus iusto corporis quidem eos repudiandae! Esse possimus delectus repellendus saepe autem distinctio sit nostrum.",
name:"Giridhar Das"
  },
   {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit, vero temporibus iusto corporis quidem eos repudiandae! Esse possimus delectus repellendus saepe autem distinctio sit nostrum.",
name:"Giridhar Das"
  },
    {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit, vero temporibus iusto corporis quidem eos repudiandae! Esse possimus delectus repellendus saepe autem distinctio sit nostrum.",
name:"Giridhar Das"
  },
    {
    review: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum, a commodi fugit odit, vero temporibus iusto corporis quidem eos repudiandae! Esse possimus delectus repellendus saepe autem distinctio sit nostrum.",
name:"Giridhar Das"
  },
];


const WhatOurUsersSay = () => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const itemsPerPage = 3;
    
      const totalPages = Math.ceil(leadsData.length / itemsPerPage);
    
      const handleDotClick = (page) => {
        setCurrentIndex(page);
      };
    
      const getVisibleLeads = () => {
        const start = currentIndex * itemsPerPage;
        return leadsData.slice(start, start + itemsPerPage);
      };
  return (
      <div className="py-10 px-4 bg-gray-50">
       
         <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          What our users say about us
        
         </h2>
   
         <div className="max-w-7xl mx-auto transition-all duration-300 ease-in-out">
           {/* Card Row */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             {getVisibleLeads().map((lead, index) => (
               <div
                 key={index}
                 className="border rounded-lg hover:border-blue-500 shadow-sm p-5 bg-white hover:shadow-md transition"
               >
                 <div className="flex px-4 py-1 font-semibold rounded-t">
                  <div className="flex items-center gap-0">
                    <img src="/Images/comma.png" alt="img"  className='w-10'/>
                    <img src="/Images/comma.png" alt="img" className='w-10' />
                  </div>

                 </div>
   
                 <div className="mt-4 space-y-2 text-sm text-gray-700">
               <p>{lead.review}</p>
                 </div>
   <p className='font-bold'>{lead.name}</p>
   
    
               </div>
             ))}
           </div>
   
           {/* Pagination Dots */}
           <div className="mt-8 flex justify-center space-x-3">
             {Array.from({ length: totalPages }).map((_, index) => (
               <button
                 key={index}
                 onClick={() => handleDotClick(index)}
                 className={`w-3 h-3 rounded-full ${
                   index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'
                 } transition-all`}
               ></button>
             ))}
           </div>
         </div>
       </div>
  )
}

export default WhatOurUsersSay
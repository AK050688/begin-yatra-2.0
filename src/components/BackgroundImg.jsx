import { Link } from 'react-router-dom';
import React from 'react';

const BackgroundImg = ({contact}) => {
  return (
    <>
    <div className="relative h-[28rem] w-full bg-[url('/Images/bg.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden animate-bg-zoom">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-12 py-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center animate-fade-in-down">
        {contact.title}
        </h1>
        
        <p className="text-white/90 text-base sm:text-lg lg:text-xl font-medium text-center max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          {contact.dis}
        </p>
      </div>
    </div>
      <div className="w-full text-white flex gap-2 bg-blue-500/30 mt-6 px-12 py-6">
      <Link to='/'>Home</Link>/ <p>{contact.title}</p>
      </div>
    </>
  );
};

export default BackgroundImg;
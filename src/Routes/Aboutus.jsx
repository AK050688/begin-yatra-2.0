import React from 'react';
import WnatToGOForm from '../components/WnatToGOForm';
import PackageMarketplace from '../components/PackageMarketplace';
import { FaInstagram } from 'react-icons/fa';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import BackgroundImg from '../components/BackgroundImg';

const teamInfo = [
  {
    img: '/Images/gojo.jpg',
    name: 'Name',
    Post: 'Founder & CEO',
  },
  {
    img: '/Images/gojo.jpg',
    name: 'Name',
    Post: 'Director of Technology',
  },
  {
    img: '/Images/gojo.jpg',
    name: 'Name',
    Post: 'Director of Sales',
  },
];

const Aboutus = () => {
  return (
    <>
      <BackgroundImg contact={{title:"About us",dis:"Resume your travel journey — we're crafting your next adventure and delightful vacation with family & friends. Have a question or need inspiration? We're here to help."}}/>
    <div className="bg-white">
      {/* Header Section */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl text-blue-600 font-bold mb-2">
          Best in Industry Experts at Your Service
        </h1>
        <p className="text-lg text-gray-700">
          More than <span className="font-bold">50 years</span> of combined experience in travel
        </p>
      </section>

      {/* Travel Form Section */}
      <section className="my-10 px-4">
        <WnatToGOForm />
      </section>

      {/* Package Marketplace Section */}
      <section className="my-10 px-4">
        <PackageMarketplace />
      </section>

      {/* Our Team Section */}
      <section className="bg-blue-50 py-12 px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-blue-600 mb-8">
          Our Amazing Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
          {teamInfo.map((data, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center relative"
            >
              <img
                src={data.img}
                alt={data.name}
                className="w-24 h-24 object-cover rounded-full mx-auto -mt-16 border-4 border-white shadow"
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">{data.name}</h3>
                <p className="text-sm text-gray-500">{data.Post}</p>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-blue-600 text-xl">
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Facebook">
                  <CiFacebook />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <CiLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>


    </div></>
  );
};

export default Aboutus;
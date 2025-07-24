import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { GoStack } from "react-icons/go";
const LeadCost = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex items-center  gap-2 mb-4">
<span className="text-2xl sm:text-3xl font-bold bg-purple-500 text-white p-3 rounded-full inline-flex items-center justify-center w-10 h-10">$</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Lead Cost Management</h1>
        </div>
        <p className="text-gray-600 mb-8 text-sm  sm:text-base max-w-2xl">
          Configure pricing for different types of travel leads 
        </p>

        {/* Cards Section */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
  {/* Card 1: Domestic Leads */}
  <div className="bg-sky-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-4">
      <FaHome className="text-4xl text-sky-500" />
      <h3 className="text-xl font-bold text-gray-800">Domestic Leads</h3>
    </div>
    <div className="ml-1 text-3xl font-extrabold text-sky-700">1</div>
  </div>

  {/* Card 2: International Leads */}
  <div className="bg-pink-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-4">
      <FaEarthAmericas className="text-4xl text-pink-500" />
      <h3 className="text-xl font-bold text-gray-800">International Leads</h3>
    </div>
    <div className="ml-1 text-3xl font-extrabold text-pink-700">1</div>
  </div>

  {/* Card 3: Both Types */}
  <div className="bg-green-100 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-4">
      <GoStack className="text-4xl text-green-500" />
      <h3 className="text-xl font-bold text-gray-800">Both Types</h3>
    </div>
    <div className="ml-1 text-3xl font-extrabold text-green-700">1</div>
  </div>
</div>
        {/* Add New Lead Cost Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Add New Lead Cost</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Type</label>
              <input
                type="text"
                placeholder="Enter lead type"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Create
          </button>
        </div>

        {/* Lead Costs Table Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Lead Costs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-sm font-medium text-gray-700">Lead Type</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-700">Price</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">Domestic Leads</td>
                  <td className="py-3 px-4 text-sm text-gray-600">₹ 50</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-sm text-gray-600">International Leads</td>
                  <td className="py-3 px-4 text-sm text-gray-600">₹ 40</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sm text-gray-600">Luxury Leads</td>
                  <td className="py-3 px-4 text-sm text-gray-600">₹ 30</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCost;
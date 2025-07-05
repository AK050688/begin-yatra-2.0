import React from 'react'
import { CiMapPin } from 'react-icons/ci';
import { LuMessageSquareMore } from 'react-icons/lu';
import { TiDevicePhone } from 'react-icons/ti';

const WnatToGOForm = () => {
  return (
    <div>
         <div className="bg-white py-8 px-4 md:px-16">
      <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
        Fill in your requirements here
      </h2>
      <div className="grid md:grid-cols-2 gap-8 border rounded-lg shadow-md p-6">
     
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How we work ?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span><CiMapPin /></span>
                <span>Select your tour – tell us your requirements</span>
              </li>
              <li className="flex items-center gap-2">
                <span><LuMessageSquareMore />
</span>
                <span>Get Multiple Free Quotes – from our verified travel experts</span>
              </li>
              <li className="flex items-start gap-2">
                <span><TiDevicePhone /></span>
                <span>Customize & Book – your preferred tour</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">We're a growing company</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-[#3b82f6]">1500+</p>
                <p className="text-sm text-gray-600">Verified Agents</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#3b82f6]">100k+</p>
                <p className="text-sm text-gray-600">Happy Travellers</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#3b82f6]">190+</p>
                <p className="text-sm text-gray-600">Destinations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#3b82f6]">Where do you want to go?</h3>
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            defaultValue="Noida"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div>
            <label className="block mb-1 text-sm text-gray-600">Departure Date (Choose Any)</label>
            <div className="flex gap-2">
              <button className="flex-1 border rounded py-2 bg-gray-100">Fixed</button>
              <button className="flex-1 border rounded py-2 bg-gray-100">Flexible</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm">Adults (12+ yrs)</label>
              <select className="w-full border rounded px-2 py-1">
                <option>Select</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Infant (0-2 yrs)</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                min={0}
              />
            </div>
            <div>
              <label className="text-sm">Children (2-12 yrs)</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                min={0}
              />
            </div>
          </div>
          <input
            type="email"
            placeholder="Enter Your Email ID"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border px-3 py-2 rounded"
          />
        <button className='w-full bg-[#3b82f6] py-2 text-white cursor-pointer rounded-lg hover:bg-[#3b83f6cc]'>Plan My Holidays</button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default WnatToGOForm
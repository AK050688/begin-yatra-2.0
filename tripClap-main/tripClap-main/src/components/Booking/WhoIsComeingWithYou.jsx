import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const companions = [
  { id: "solo", label: "Solo", img: "/Images/solo.png", count: 1 },
  { id: "partner", label: "Partner", img: "/Images/partner.png", count: 2 },
  { id: "friends", label: "Friends", img: "/Images/friends.png", count: 3 },
  { id: "family", label: "Family", img: "/Images/family.png", count: 5 },
];

const WhoIsComeingWithYou = () => {
  const [selected, setSelected] = useState("solo");
  const [hours, setHours] = useState(9);
  const [pricePerPerson, setPricePerPerson] = useState(5000);

  const navigate=useNavigate()

  const peopleCount = companions.find((c) => c.id === selected)?.count || 1;
  const totalBudget = peopleCount * pricePerPerson;

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-10 text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">Who's coming with you?</h2>
      <p className="text-gray-600 mb-4">Choose one</p>

      {/* Companion Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {companions.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`border rounded-xl flex flex-col items-center p-4 transition-all duration-200 ${
              selected === item.id
                ? "border-red-400 bg-red-100 shadow-md"
                : "border-gray-300 bg-white hover:shadow"
            }`}
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Hours Slider */}
      <div className="mb-8">
        <label className="block font-medium mb-2">
          Choose The Value <span className="text-sm text-gray-500">(in Hours)</span>
        </label>
        <input
          type="range"
          min="3"
          max="12"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full"
        />
        <p className="mt-1 text-sm text-gray-700">
          Activity Hour: <span className="font-semibold">{hours} hours</span>
        </p>
      </div>

      {/* Price Slider */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          Choose The Value of per person <span className="text-sm text-gray-500">(in ₹ Rupees)</span>
        </label>
        <input
          type="range"
          min="5000"
          max="100000"
          step="1000"
          value={pricePerPerson}
          onChange={(e) => setPricePerPerson(Number(e.target.value))}
          className="w-full"
        />
        <p className="mt-1 text-sm text-gray-700">
          ₹ {pricePerPerson.toLocaleString()}
        </p>
      </div>

      {/* Budget */}
      <div className="mt-4 font-semibold text-lg text-gray-800">
        Budget: ₹ {totalBudget.toLocaleString()}
      </div>
      <div className="flex justify-end w-full px-20"><button onClick={()=>navigate('/*spend-time')} className="btn btn-primary">Next</button></div>

    </div>
  );
};



export default WhoIsComeingWithYou
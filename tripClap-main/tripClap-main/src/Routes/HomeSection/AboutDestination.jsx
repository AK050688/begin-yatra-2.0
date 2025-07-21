import React from "react";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AboutStory = [];

const AboutDestination = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section>
        <div className="flex gap-4 mx-20 pt-10">
          <div className="w-1/2">
            <img src="/Images/kashmir.jpg" alt="image" />
          </div>
          <div className="mx-10 w-1/2">
            <h1 className="font-medium pl-4 text-4xl">Kashmir</h1>
            <h1 className="flex items-center gap-2 pl-4">
              <IoLocation className="" />
              Kashmir,India
            </h1>
            <div className="grid grid-cols-2 gap-8 p-5 ">
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Package" <br />
                <span>
                  <strong>1000 to 34000</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Duration" <br />
                <span>
                  <strong>1 to 3 days</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Best Time to Visit" <br />
                <span>
                  <strong>Oct to Nov</strong>
                </span>
              </div>
              <div className="text-center mx-5 border-gray-200 border shadow-lg p-5 w-80">
                "Theme" <br />
                <span>
                  <strong>Snow</strong>
                </span>
              </div>
            </div>
            <button
              className="btn bg-blue-500 w-50 p-5 mx-10 rounded-2xl text-white"
              onClick={() => navigate("/get-qurey")}
            >
              Explore
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="">
          <h1 className="font-medium pt-5 text-3xl mx-20">
            Kashmir <span className="text-sky-500">Tour Guide</span>
          </h1>
          <p className="mx-20 pt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            corporis eaque veniam praesentium provident libero, quisquam cum
            fugiat harum totam voluptas odit eum sint sit eos fugit, possimus
            ipsa, vel asperiores. Itaque dicta velit ullam veritatis nam, dolor
            fugiat reprehenderit hic, expedita totam temporibus quod delectus
            aliquid. Vitae, libero aliquam reprehenderit itaque doloremque porro
            ullam magnam molestias placeat tempora eos eaque aperiam. Quia unde
            est placeat ea corporis. Nam harum officiis magnam ex porro numquam
            soluta nostrum .
          </p>

          <ol className=" pt-8 list-decimal">
            <p className="mx-18 text-2xl">
              <span className="text-sky-600">Top Attractions</span> in Kashmir
            </p>
            <li className="mx-25 pt-3">Coringa Wildlife Sanctuary.</li>
            <li className="mx-25">Hope Island.</li>
            <li className="mx-25">Kashmir Beach.</li>
            <li className="mx-25">Dolphine Nose.</li>
            <li className="mx-25">Patnitop.</li>
          </ol>
          <h3 className="mx-20 pt-5 text-2xl">
            Kashmir is <span className="text-sky-600">Famous for</span>
          </h3>
          <p className="mx-20">
            its stunning natural beauty, including picturesque valleys, serene
            lakes, and snow-capped mountains.
          </p>

          <ul className=" pt-8 list-disc">
            <p className="mx-18 text-2xl">
              <span className="text-sky-600">What's Great</span> about Kashmir?
            </p>
            <li className="mx-25 pt-3">Stunning natural beauty.</li>
            <li className="mx-25">Snow-capped Mountains.</li>
            <li className="mx-25">Unique Seasons.</li>
            <li className="mx-25">Stunning Landscapes.</li>
            <li className="mx-25">Serene Lakes.</li>
          </ul>
          <ul className=" pt-8 list-disc">
            <p className="mx-18 text-2xl">
              Cultural Experiences in
              <span className="text-sky-600"> Kashmir?</span>
            </p>
            <li className="mx-25 pt-3">Rich Handicrafts.</li>
            <li className="mx-25">Delicious Cuisine.</li>
            <li className="mx-25">Spiritual Sites.</li>
            <li className="mx-25">Friendly Locals.</li>
            <li className="mx-25">Paradise on Earth.</li>
          </ul>
          <ul className=" pt-8 list-disc">
            <p className="mx-18 text-2xl">
              Tips for
              <span className="text-sky-600"> Kashmir</span>
            </p>
            <li className="mx-25 pt-3">
              Know When To Visit Kashmir As Per Weather.
            </li>
            <li className="mx-25">Carry All Your Necessary Documents Along.</li>
            <li className="mx-25"> Travel Light While Visiting Kashmir.</li>
            <li className="mx-25">Take Necessary Medicines Along.</li>
            <li className="mx-25">Have Knowledge About The Currency.</li>
          </ul>
          <ul className=" pt-8 list-disc">
            <p className="mx-18 text-2xl">
              Important Information
              <span className="text-sky-600"> About Trip</span>
            </p>
            <li className="mx-25 pt-3">
              <strong>Ideal Duration:</strong>3-4 days.
            </li>
            <li className="mx-25">
              <strong>Best Time To Visit:</strong>Sep to Jan.
            </li>
            <li className="mx-25">
              <strong>Nearest Airport:</strong>Sheikh ul-Alam International
              Airport (Srinagar Airport).
            </li>
          </ul>
          <div>
            <p className="mx-18 text-2xl pt-8">
              Top <span className="text-sky-600">6 Places</span> to visit in{" "}
              <span className="text-sky-600">Kashmir</span>
            </p>
            <div className="grid grid-cols-3 gap-2 p-5 w-250 mx-20">
              <div className="pt-5 text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Gulmarg</p>
              </div>
              <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Pahalgam</p>
              </div>
              <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Shrinagar</p>
              </div>
              <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Dal Lake</p>
              </div>
              <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Nigeen Lake</p>
              </div>
              <div className="text-left mx-5 border-gray-200 border shadow-lg p-5 w-80">
                <img src="/Images/moreplace.png" alt="More Place" />
                <p>Patnitop</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutDestination;

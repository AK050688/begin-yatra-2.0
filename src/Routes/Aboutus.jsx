import React from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import BackgroundImg from "../components/BackgroundImg";

// Mock BackgroundImg component
// const BackgroundImg = ({ contact }) => (
//   <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
//     <div className="max-w-7xl mx-auto text-center">
//       <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight">
//         {contact.title}
//       </h1>
//       <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
//         {contact.dis}
//       </p>
//     </div>
//   </div>
// );

// const teamInfo = [
//   {
//     img: "/Images/gojo.jpg",
//     name: "Name",
//     Post: "Founder & CEO",
//   },
//   {
//     img: "/Images/gojo.jpg",
//     name: "Name",
//     Post: "Director of Technology",
//   },
//   {
//     img: "/Images/gojo.jpg",
//     name: "Name",
//     Post: "Director of Sales",
//   },
// ];

const Aboutus = () => {
  return (
    <div className="bg-white">
      <BackgroundImg
        contact={{
          title: "About us",
          dis: "Resume your travel journey — we're crafting your next adventure and delightful vacation with family & friends. Have a question or need inspiration? We're here to help.",
        }}
      />
      {/* Travel Form Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Your Travel Dreams, Our Priority
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 leading-relaxed">
              At BeginYatra, we're passionate about transforming the way people
              explore the world. We believe that travel is more than just
              visiting new places – it's about experiencing different cultures,
              meeting new people, and creating lifelong memories.
            </p>
            <div className="mt-8 flex justify-center">
              <img
                src="/Images/aboutpriority1.webp"
                alt="priority"
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-center gap-6 bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="md:">
              <img
                src="/Images/story.avif"
                alt="Traveling Man"
                className="w-80 h-80 rounded-2xl shadow-md"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 font-serif">
                Our Story
              </h2>
              <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed">
                BeginYatra was founded on the principle that travel should be
                accessible, enjoyable, and stress-free. With years of experience
                in the travel industry, our team has witnessed firsthand the
                challenges travelers face when planning their trips. We're
                dedicated to changing this narrative by providing innovative
                solutions that empower travel agents and delight travelers. Our
                journey began with a simple yet ambitious goal: to bridge the
                gap between travel dreams and reality.
              </p>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-serif text-blue-600">
                  For Travelers
                </h2>
                <ul className="list-disc pl-6 space-y-6">
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Personalized Travel Experiences
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We work with travel agents to craft customized itineraries
                      that meet your unique preferences and aspirations. Whether
                      you're looking for relaxation, adventure, or cultural
                      exploration, we'll help you create unforgettable
                      experiences.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Unforgettable Memories
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Our goal is to help you create lifelong memories that
                      you'll cherish forever. From trying new foods to exploring
                      hidden gems, we'll make sure your travel experience is
                      nothing short of amazing.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Effortless Planning
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We'll connect you with travel agents who have the
                      expertise and resources to make your travel planning
                      process seamless and enjoyable. No more endless research
                      or tedious planning – we've got you covered!
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Travel Inspiration
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Get inspired by our travel stories, tips, and
                      recommendations. Whether you're a seasoned traveler or
                      just starting to plan your next trip, we'll provide you
                      with the insights and ideas you need to make your travel
                      dreams a reality.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src="/Images/traveler.webp"
                  alt="Traveler"
                  className="w-full max-w-md h-auto rounded-3xl shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 flex justify-center items-center order-2 md:order-1">
                <img
                  src="/Images/travelagent1.jpg"
                  alt="Travel Agent"
                  className="w-full max-w-md h-auto rounded-3xl shadow-md"
                />
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-serif text-blue-600">
                  For Travel Agents
                </h2>
                <ul className="list-disc pl-6 space-y-6 mt-6">
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      High-Quality Leads
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We provide travel agents with targeted leads that help
                      grow their business and increase their customer base. Our
                      leads are carefully curated to ensure they're relevant,
                      interested, and ready to book.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Efficient Solutions
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      Our innovative solutions streamline the travel planning
                      process, allowing you to focus on delivering exceptional
                      travel experiences. From itinerary planning to booking and
                      payment, we've got the tools and resources you need to
                      succeed.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Partnership Opportunities
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We believe in building strong partnerships with travel
                      agents, providing them with the tools and resources they
                      need to succeed. Whether you're a small agency or a large
                      tour operator, we'll work with you to create a customized
                      solution that meets your unique needs.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Business Growth
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We'll help you grow your business and increase your
                      revenue through our targeted marketing campaigns and lead
                      generation services. Our goal is to help you succeed, and
                      we'll work tirelessly to ensure you get the results you
                      need.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center font-serif text-blue-600">
                  Our Values
                </h2>
                <ul className="list-disc pl-6 space-y-6 mt-6">
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Customer-Centric Approach
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We're dedicated to understanding your needs and
                      preferences, tailoring our services to meet your unique
                      requirements. Whether you're a traveler or a travel agent,
                      we'll work with you to create a personalized experience
                      that exceeds your expectations.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">Innovation</strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We continuously strive to improve our services, leveraging
                      the latest technology and trends to enhance the travel
                      planning experience. From mobile apps to AI-powered
                      chatbots, we'll always be at the forefront of innovation.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">Integrity</strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We operate with transparency, honesty, and integrity,
                      building trust with our partners and travelers. We'll
                      always be upfront and honest about our services, fees, and
                      policies.
                    </p>
                  </li>
                  <li>
                    <strong className="text-xl sm:text-2xl">
                      Passion for Travel
                    </strong>
                    <p className="text-base sm:text-lg leading-relaxed">
                      We're passionate about travel and committed to helping
                      others experience the joy of exploration. Whether you're a
                      seasoned traveler or just starting to plan your next trip,
                      we'll share our passion and expertise with you.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <img
                  src="/Images/value.jpg"
                  alt="Values"
                  className="w-full max-w-md h-auto rounded-3xl shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600 font-serif">
              Our Goal
            </h2>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Our ultimate goal is to make travel planning effortless and
              enjoyable for all. We envision a world where travelers can focus
              on creating memories, not stressing about logistics. By bridging
              the gap between travel dreams and reality, we aim to become the
              go-to partner for travel agents and travelers alike.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      {/* <section className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-8">
          Our Amazing Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {teamInfo.map((data, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center relative hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={data.img}
                alt={data.name}
                className="w-24 h-24 object-cover rounded-full mx-auto -mt-16 border-4 border-white shadow"
              />
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {data.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500">{data.Post}</p>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-blue-600 text-xl sm:text-2xl">
                <a href="#" aria-label="Instagram" className="hover:text-blue-800 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-blue-800 transition-colors">
                  <CiFacebook />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-blue-800 transition-colors">
                  <CiLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Aboutus;

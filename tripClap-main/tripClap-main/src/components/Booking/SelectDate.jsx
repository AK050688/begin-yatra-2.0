  import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SelectDate = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [picking, setPicking] = useState("start"); // 'start' or 'end'

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const navigate=useNavigate()

  const generateCalendar = () => {
    const month = today.getMonth();
    const year = today.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(month, year);
    const calendar = [];

    for (let i = 0; i < firstDay; i++) calendar.push(null);
    for (let i = 1; i <= totalDays; i++) calendar.push(new Date(year, month, i));

    return calendar;
  };

  const isSameDate = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  const isInRange = (date) => {
    if (!startDate || !endDate || !date) return false;
    return date > startDate && date < endDate;
  };

  const handleDateClick = (date) => {
    if (picking === "start") {
      setStartDate(date);
      setEndDate(null);
      setPicking("end");
    } else {
      if (date > startDate) {
        setEndDate(date);
        setPicking("start");
      } else {
        // if clicked end date is before start, reset
        setStartDate(date);
        setEndDate(null);
        setPicking("end");
      }
    }
  };

  const calendarDays = generateCalendar();
  return (
    <>
      {" "}
      <div className=" flex flex-col justify-center gap-4 text-center mt-10 w-full   ">
        <h4 className="text-2xl font-semibold">Where do you want to go?</h4>
        <p className="text-sm text-gray-500">
          Choose a date range or length of stay, up to 7 days.
        </p>
        <p></p>
      </div>
      
      <div className="rounded-4xl flex items-center gap-4 border-1 mx-auto border-gray-500 w-2xl h-10 py-1 px-4">
   <FaRegCalendarAlt />
   <span>Start date → End date</span>
      </div>


  
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">
        Select Your Travel Dates
      </h2>

      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <div>
          <span className="font-medium">From:</span>{" "}
          {startDate ? startDate.toDateString() : "Select"}
        </div>
        <div>
          <span className="font-medium">To:</span>{" "}
          {endDate ? endDate.toDateString() : "Select"}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => {
          const isStart = isSameDate(date, startDate);
          const isEnd = isSameDate(date, endDate);
          const inRange = isInRange(date);

          return (
            <div
              key={index}
              className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all
                ${
                  !date
                    ? ""
                    : isStart
                    ? "bg-blue-600 text-white font-semibold"
                    : isEnd
                    ? "bg-blue-500 text-white font-semibold"
                    : inRange
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-200"
                }`}
              onClick={() => date && handleDateClick(date)}
              onMouseEnter={() => setHoverDate(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>

      <div className="flex justify-end w-full px-20"><button onClick={()=>navigate('/*peoples')} className="btn btn-primary">Next</button></div>

    </>
  );
};

export default SelectDate;

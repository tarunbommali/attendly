import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { rollList } from "../../utils/rollList";
import { RiSortNumberAsc } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";

const Heropage1 = () => {
  const [presentsDetails, setPresentsDetails] = useState([]); // Store selected students
  const [displayStyle, setDisplayStyle] = useState("number"); // Controls display format
  const todayDate = new Date().toLocaleDateString(); // Get today's date

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  // Load attendance from localStorage on page load
  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    if (savedAttendance[todayDate]) {
      setPresentsDetails(savedAttendance[todayDate]);
    }
  }, [todayDate]);

  // Toggle function to switch between display styles
  const toggleDisplayStyle = () => {
    setDisplayStyle((prev) => (prev === "number" ? "number + name" : "number"));
  };

  // Toggle attendance
  const toggleAttendance = (name) => {
    setPresentsDetails((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Save attendance to localStorage
  const handleSubmit = () => {
    const attendanceData = JSON.parse(localStorage.getItem("attendance")) || {};
    attendanceData[todayDate] = presentsDetails;
    localStorage.setItem("attendance", JSON.stringify(attendanceData));
    alert("Attendance saved successfully! ✅");
    setPresentsDetails([]); 

  };

  // Clear all attendance for the day
  const handleClearAll = () => {
    setPresentsDetails([]);
    const attendanceData = JSON.parse(localStorage.getItem("attendance")) || {};
    delete attendanceData[todayDate]; // Remove today's record
    localStorage.setItem("attendance", JSON.stringify(attendanceData));
    alert("Attendance cleared! ❌");
   };

  return (
    <div className={`min-h-screen px-4 md:px-10 py-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Date: {todayDate}</h1>
        <h1 className="text-xl md:text-2xl font-semibold">Present: {presentsDetails.length}</h1>

        {/* Toggle button for display style */}
        <button onClick={toggleDisplayStyle} className="p-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition">
          {displayStyle === "number" ? <RiSortNumberAsc size={20} /> : <FaListCheck size={20} />}
        </button>
      </div>

      {/* Attendance List */}
      <div className="flex flex-wrap  gap-3">
        {rollList.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              presentsDetails.includes(item.name)
                ? "bg-green-500 text-white"
                : theme === "dark"
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => toggleAttendance(item.name)}
          >
            {displayStyle === "number"
              ? item.registrationNumber.slice(-2) // Show only last 2 digits of reg. no.
              : `${item.registrationNumber.slice(-2)} ${item.name}`} {/* Show number + name */}
          </button>
        ))}
      </div>

      {/* Submit & Clear Buttons */}
      <div className="mt-6 flex justify-between">
        <button 
          onClick={handleClearAll} 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Clear All ❌
        </button>

        <button 
          onClick={handleSubmit} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Submit Attendance ✅
        </button>
      </div>
    </div>
  );
};

export default Heropage1;

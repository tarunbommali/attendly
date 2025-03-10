import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";


const History = () => {
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  // Load attendance history from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendanceHistory(storedData);
  }, []);

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Breadcrumbs */}
      <div className="text-sm mb-4">
        <ul className="flex gap-2">
          <li className="text-blue-500 cursor-pointer" onClick={() => setSelectedDate(null)}>
            History
          </li>
          {selectedDate && (
            <li className="flex item-center text-gray-500">
              <FaChevronRight/>{selectedDate}
            </li>
          )}
        </ul>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Attendance History</h1>

      {/* Show list of dates if no date is selected */}
      {!selectedDate ? (
        <div className="grid gap-3">
          {Object.keys(attendanceHistory).length > 0 ? (
            Object.entries(attendanceHistory).map(([date, students]) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <span className="font-medium">{date}</span>
                <span className="text-blue-600 dark:text-blue-400">Present: {students.length}</span>
              </button>
            ))
          ) : (
            <p className="text-gray-500">No attendance records found.</p>
          )}
        </div>
      ) : (
        // Show details when a date is selected
        <div>
          <h2 className="text-xl font-semibold mb-3">Attendance on {selectedDate}</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            {attendanceHistory[selectedDate].map((name, index) => (
              <p key={index} className="py-1 border-b border-gray-300 dark:border-gray-700">
                {name}
              </p>
            ))}
          </div>
          <button 
            onClick={() => setSelectedDate(null)} 
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to History
          </button>
        </div>
      )}
    </div>
  );
};

export default History;

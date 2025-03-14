import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa";
import { AttendanceView } from "../components/History/AttendanceView";
import { HistoryList } from "../components/History/HistoryList";

const History = () => {
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendanceHistory(storedData);
  }, []);

  return (
    <div
      className={`min-h-screen mt-[-10px] p-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Breadcrumbs */}
      <div className="text-sm mb-4">
        <ul className="flex gap-2">
          <li
            className={`cursor-pointer ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
            onClick={() => setSelectedDate(null)}
          >
            History
          </li>
          {selectedDate && (
            <li
              className={`flex items-center ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <FaChevronRight />
              {selectedDate}
            </li>
          )}
        </ul>
      </div>

      {!selectedDate ? (
        <HistoryList
          attendanceHistory={attendanceHistory}
          setSelectedDate={setSelectedDate}
          theme={theme}
        />
      ) : (
        <AttendanceView
          attendanceHistory={attendanceHistory}
          selectedDate={selectedDate}
          theme={theme}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
};

export default History;

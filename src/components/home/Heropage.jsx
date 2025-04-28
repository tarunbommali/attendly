/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
 import StudentStatsChart from "./StudentStatsChart";
import AttendanceList from "./AttendanceList";
import AttendanceHeader from "./AttendanceHeader";
import { CiCalendarDate } from "react-icons/ci";
import { FaListCheck, FaDownload } from "react-icons/fa6";
import { RiSortNumberAsc } from "react-icons/ri";
import { useOutletContext } from "react-router-dom";

const Heropage1 = () => {
  const { studentRollList } = useOutletContext();
  
  const [presentsDetails, setPresentsDetails] = useState([]);
  const [displayStyle, setDisplayStyle] = useState("number");
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const today = new Date();
  const todayDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[today.getDay()];

  const dayColors = {
    Sun: "text-red-500",
    Mon: "text-blue-500",
    Tue: "text-green-500",
    Wed: "text-yellow-500",
    Thu: "text-purple-500",
    Fri: "text-pink-500",
    Sat: "text-orange-500",
  };

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const savedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};
    if (savedAttendance[todayDate]) {
      setPresentsDetails(savedAttendance[todayDate]);
      setAttendanceSubmitted(true);
    } else {
      setAttendanceSubmitted(false);
    }
  }, [todayDate]);

  const toggleDisplayStyle = () => {
    setDisplayStyle((prev) => (prev === "number" ? "number + name" : "number"));
  };

  const toggleAttendance = (name) => {
    if (!attendanceSubmitted) {
      setPresentsDetails((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    }
  };
  const handleSubmit = () => {
    const attendanceData = JSON.parse(localStorage.getItem("attendance")) || {};
    attendanceData[todayDate] = presentsDetails;
    localStorage.setItem("attendance", JSON.stringify(attendanceData));

    // ✅ Show different messages based on whether it's a first-time submit or an update
    setToastMessage(
      attendanceSubmitted
        ? "Attendance updated successfully! ✏️"
        : "Attendance saved successfully! ✅"
    );
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    setAttendanceSubmitted(true);
  };

  const handleEdit = () => {
    setAttendanceSubmitted(false);
  };

  const handleDownload = () => {
    alert("Downloading attendance data...");
  };

  const handleExportPDF = () => {
    alert("Exporting attendance as PDF...");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`min-h-screen p-2 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`pt-2 px-2 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <AttendanceHeader
          todayDate={todayDate}
          toggleDisplayStyle={toggleDisplayStyle}
          displayStyle={displayStyle}
          theme={theme}
          rollList={studentRollList}
          attendanceSubmitted={attendanceSubmitted}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold  dark:text-white">
          <CiCalendarDate
            size={22}
            className={theme == "dark" ? "text-white" : "text-black"}
          />
          <span className={dayColors[day]}>
            Today Attendance: {day}, {todayDate}
          </span>
        </h2>

        <div className="flex gap-2 items-center relative">
          {!attendanceSubmitted ? (
            <button
              onClick={toggleDisplayStyle}
              className={`p-2 rounded transition ${
                theme === "dark"
                  ? "text-white hover:bg-gray-600"
                  : "text-black hover:bg-gray-300"
              }`}
              title="Toggle Display"
            >
              {displayStyle === "number" ? (
                <FaListCheck size={18} />
              ) : (
                <RiSortNumberAsc size={18} />
              )}
            </button>
          ) : (
            <div className="relative inline-block text-left">
              <div
                onClick={toggleDropdown}
                tabIndex={0}
                role="button"
                className={`p-2 rounded transition cursor-pointer ${
                  theme === "dark"
                    ? "text-white hover:bg-gray-600"
                    : "text-black hover:bg-gray-300"
                }`}
                title="Download Options"
              >
                <FaDownload size={18} />
              </div>

              {dropdownOpen && (
                <ul
                  className={`absolute right-0 mt-2 w-52 rounded-md z-10 shadow-lg border transition-all duration-150
                    ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                >
                  <li>
                    <a
                      onClick={handleDownload}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Download
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleExportPDF}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Export as PDF
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {attendanceSubmitted ? (
        <StudentStatsChart
          rollList={studentRollList}
          presentsDetails={presentsDetails}
        />
      ) : (
        <AttendanceList
          rollList={studentRollList}
          presentsDetails={presentsDetails}
          toggleAttendance={toggleAttendance}
          displayStyle={displayStyle}
          theme={theme}
          attendanceSubmitted={attendanceSubmitted}
          todayDate={todayDate}
        />
      )}
      {showToast && (
        <div className="toast toast-center toast-bottom z-50">
          <div className="alert alert-success w-[400px] px-4 py-2 shadow-md rounded-md">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heropage1;

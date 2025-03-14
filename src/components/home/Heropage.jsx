import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { rollList } from "../../utils/rollList";
import { FaEdit } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import StudentStats from "./StudentStats";
import AttendanceList from "./AttendanceList"; // Import AttendanceList component
import AttendanceHeader from "./AttendanceHeader";

const Heropage1 = () => {
  const [presentsDetails, setPresentsDetails] = useState([]);
  const [displayStyle, setDisplayStyle] = useState("number");
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const today = new Date();
  const todayDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

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
    alert("Attendance saved successfully! ✅");
    setAttendanceSubmitted(true);
  };

  const handleEdit = () => {
    setAttendanceSubmitted(false);
  };

  return (
    <div
      className={`min-h-screen   py-2 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >


{/* Attendance Header */}
<div
  className={`p-4 mb-5 ${
    theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
  }`}
>
  
  <AttendanceHeader
    todayDate={todayDate}
    toggleDisplayStyle={toggleDisplayStyle}
    displayStyle={displayStyle}
    theme={theme}
  />

  {/* Student Stats Component */}
  <StudentStats rollList={rollList} presentsDetails={presentsDetails} />
</div>





      {/* Attendance List Component */}
      <AttendanceList
        rollList={rollList}
        presentsDetails={presentsDetails}
        toggleAttendance={toggleAttendance}
        displayStyle={displayStyle}
        theme={theme}
        attendanceSubmitted={attendanceSubmitted}
      />

      <div className="mt-6 flex justify-between">
        {attendanceSubmitted ? (
          <button
            onClick={handleEdit}
            className={`flex items-center px-6 py-3 rounded-lg text-lg font-semibold transition ${
              theme === "dark"
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            <span>Edit </span>
            <span className="mx-1">
              <FaEdit />
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`flex items-center px-8 py-3 rounded-lg text-lg font-semibold transition ${
              theme === "dark"
                ? "bg-blue-400 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <span>Submit </span>
            <span className="mx-1">
              <MdOutlineSubdirectoryArrowLeft />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Heropage1;

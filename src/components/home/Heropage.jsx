import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { rollList } from "../../utils/rollList";
import { RiSortNumberAsc } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { TiGroup } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";

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
      className={`min-h-screen px-4 md:px-10 py-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex md:flex-row items-center">
          <div className="flex items-center text-lg md:text-xl font-semibold mx-2">
            <span className="mx-1">
              <CiCalendarDate />
            </span>
            <span>{todayDate}</span>
          </div>
          {/* Total Students  */}
          <div className="hidden md:flex items-center text-lg md:text-xl font-semibold mx-2">
            <span className="mx-1">
              <TiGroup />
            </span>
            <span className="italic">Total: {rollList.length}</span>
          </div>
          {/* Regular Students  */}
          <div className="hidden md:flex items-center text-lg md:text-xl font-semibold mx-2">
            <span className="mx-1">
              <TiGroup />
            </span>
            <div>
              <span className="text-green-500 italic">
                Regular: {rollList.filter((s) => s.type === "Regular").length}{" "}
              </span>
            </div>
          </div>
          {/* present Students */}
          <div className="hidden md:flex items-center text-lg md:text-xl font-semibold mx-2">
            <span className="mx-1">
              <TiGroup />
            </span>
            <span className="italic">Present: {presentsDetails.length}</span>
          </div>
          {/* Absent Students  */}
          <div className="hidden md:flex items-center text-lg md:text-xl font-semibold mx-2">
            <span className="italic">
              Absent:{" "}
              {rollList.filter((s) => s.type === "Regular").length -
                presentsDetails.filter((name) =>
                  rollList.some((s) => s.name === name && s.type === "Regular")
                ).length}
            </span>
          </div>
        </div>
        <button
          onClick={toggleDisplayStyle}
          className={`p-2 rounded transition ${
            theme === "dark"
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-300 text-black hover:bg-gray-400"
          }`}
        >
          {displayStyle === "number" ? (
            <FaListCheck size={20} />
          ) : (
            <RiSortNumberAsc size={20} />
          )}
        </button>
      </div>
      <div className="flex flex-col md:hidden my-2 mb-2">
      <div className="flex justify-between items-center">
        {/* Total Students  */}
        <div className="flex items-center text-lg md:text-xl font-semibold mx-2">
          <span className="mx-1">
            <TiGroup />
          </span>
          <span className="italic">Total: {rollList.length}</span>
        </div>
        {/* Regular Students  */}
        <div className="flex items-center text-lg md:text-xl font-semibold mx-2">
          <span className="mx-1">
            <TiGroup />
          </span>
          <div>
            <span className="text-green-500 italic">
              Regular: {rollList.filter((s) => s.type === "Regular").length}{" "}
            </span>
          </div>
        </div></div>
        <div className="flex justify-between items-center">
        {/* present Students */}
        <div className="flex items-center text-lg md:text-xl font-semibold mx-2">
          <span className="mx-1">
            <TiGroup />
          </span>
          <span className="italic">Present: {presentsDetails.length}</span>
        </div>
        {/* Absent Students  */}
        <div className="flex items-center text-lg md:text-xl font-semibold mx-2">
          <span className="mx-1">
            <TiGroup />
          </span>
          <span className="italic">
            Absent:{" "}
            {rollList.filter((s) => s.type === "Regular").length -
              presentsDetails.filter((name) =>
                rollList.some((s) => s.name === name && s.type === "Regular")
              ).length}
          </span>
        </div></div>
      </div>

      {/* Attendance List */}
      <div className="flex flex-wrap gap-3">
        {rollList.map((item, index) => {
          const isPresent = presentsDetails.includes(item.name);
          const isDetained = item.type === "Detained";

          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                isDetained
                  ? "bg-black text-white cursor-not-allowed" // Highlight detained students
                  : isPresent
                  ? "bg-green-500 text-white"
                  : theme === "dark"
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
              onClick={() => !isDetained && toggleAttendance(item.name)}
              disabled={isDetained || attendanceSubmitted} // Prevents detained & submitted edits
            >
              {displayStyle === "number"
                ? item.registrationNumber.slice(-2)
                : `${item.registrationNumber.slice(-2)} ${item.name}`}
            </button>
          );
        })}
      </div>

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
            <span>Edit Attendance</span>
            <span className="mx-1">
              <FaEdit />
            </span>
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className={`flex items-center px-6 py-3 rounded-lg text-lg font-semibold transition ${
              theme === "dark"
                ? "bg-blue-400 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <span>Submit Attendance</span>
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

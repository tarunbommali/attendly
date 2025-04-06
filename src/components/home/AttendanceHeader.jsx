/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const AttendanceHeader = ({
  handleEdit,
  handleSubmit,
  attendanceSubmitted,
  theme,
  rollList,
}) => {
  const [userDetails, setUserDetails] = useState({ department: '', semester: '' });

  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedDetails) {
      setUserDetails(storedDetails);
    }
  }, []);

  const semesterLabel =
    userDetails.semester === "2" || userDetails.semester === 2 ? "II" : userDetails.semester;

  return (
    <div className="mb-6 border-b pb-3 border-gray-300 dark:border-gray-700">
      {/* Small screen */}
      <div className="flex flex-col gap-3 sm:hidden">
        {/* Row 1: Title */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-md font-light gap-2">
            {userDetails.department} {semesterLabel} Semester
          </div>
        </div>

        {/* Row 2: Total */}
        <p
          className={`text-sm font-semibold w-full px-3 py-2 rounded-md ${
            theme === "dark"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          Total: {rollList.length}
        </p>

        {/* Row 3: Regular */}
        <p
          className={`text-sm font-semibold w-full px-3 py-2 rounded-md ${
            theme === "dark"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          Regular: {rollList.filter((s) => s.type === "Regular").length}
        </p>

        {/* Row 4: Button */}
        <div className="w-full">
          {attendanceSubmitted ? (
            <button
              onClick={handleEdit}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-semibold transition ${
                theme === "dark"
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Edit <FaEdit />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-semibold transition ${
                theme === "dark"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Submit <MdOutlineSubdirectoryArrowLeft />
            </button>
          )}
        </div>
      </div>

      {/* Medium and large screens */}
      <div className="hidden sm:flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center text-lg font-light gap-2">
            {userDetails.department} {semesterLabel} Semester
          </div>

          <p
            className={`text-sm font-semibold px-3 py-2 rounded-md ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            Total Students: {rollList.length}
          </p>

          <p
            className={`text-sm font-semibold px-3 py-2 rounded-md ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            Regular: {rollList.filter((s) => s.type === "Regular").length}
          </p>
        </div>

        <div>
          {attendanceSubmitted ? (
            <button
              onClick={handleEdit}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition ${
                theme === "dark"
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Edit <FaEdit />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition ${
                theme === "dark"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Submit <MdOutlineSubdirectoryArrowLeft />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;

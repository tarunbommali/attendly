/* eslint-disable react/prop-types */
import { CiCalendarDate } from "react-icons/ci";
import { RiSortNumberAsc } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";

const AttendanceHeader = ({ todayDate, toggleDisplayStyle, displayStyle, theme }) => {
  return (
    <div className={`flex flex-row items-center  justify-between pb-4 mb-2  ${
          theme === "dark"
            ? " text-white "
            : "text-black "
        }`}>
       {/* Date Section */}
      <div className="flex items-center text-lg md:text-xl font-semibold gap-2">
        <CiCalendarDate size={22} />
        <span>{todayDate}</span>
      </div>

      {/* Toggle Button for Display Style */}
      <button
        onClick={toggleDisplayStyle}
        className={`p-2 rounded transition ${
          theme === "dark"
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
      >
        {displayStyle === "number" ? <FaListCheck size={18} /> : <RiSortNumberAsc size={18} />}
      </button>
    </div>
  );
};

export default AttendanceHeader;

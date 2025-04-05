/* eslint-disable react/prop-types */
// StudentCharts.jsx
import { useState } from "react";
import SubjectChart from "./SubjectChart";
import { useSelector } from "react-redux";

const StudentCharts = ({ students, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showBelow75, setShowBelow75] = useState(false);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  const filteredStudents = students.filter((student) => {
    const name = student["Name of the Student"]?.toLowerCase() || "";
    const roll = student["ROLL NUMBER"]?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    const matchesSearch = name.includes(term) || roll.includes(term);
    const isBelow75 = parseFloat(student.total_hours_percentage) < 75;
    return matchesSearch && (!showBelow75 || isBelow75);
  });

  return (
    <div
      className={`px-2 min-h-screen py-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Search and toggle */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <input
          type="text"
          placeholder="Search by name or roll number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full md:max-w-md px-4 py-2 rounded-lg shadow-sm border transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${theme === "dark" ? 
              "bg-gray-800 text-white border-gray-700 placeholder-gray-400" : 
              "bg-white text-gray-800 border-gray-300 placeholder-gray-500"}
          `}
        />

        <div className="flex items-center gap-2">
          <label
            htmlFor="toggle"
            className={`text-sm md:text-base transition-colors duration-300 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            Show only &lt; 75%
          </label>
          <input
            id="toggle"
            type="checkbox"
            checked={showBelow75}
            onChange={() => setShowBelow75(!showBelow75)}
            className={`h-5 w-5 rounded cursor-pointer transition-all duration-300
              focus:ring-blue-500
              ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}
            `}
          />
        </div>
      </div>

      {/* Student Charts or shimmer UI */}
      {loading
        ? [...Array(3)].map((_, idx) => <SubjectChart key={idx} loading={true} />)
        : filteredStudents.map((student) => (
            <SubjectChart key={student["ROLL NUMBER"]} student={student} />
          ))}
    </div>
  );
};

export default StudentCharts;

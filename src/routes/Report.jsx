/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import StudentCharts from "../components/report/StudentCharts";
function Report() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";
  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-all duration-300 mt-[-10px] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className={`text-sm mb-4 sm:mb-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
        Student Attendance Report
      </h1>

 
      <StudentCharts/>
    </div>
  );
}

export default Report;

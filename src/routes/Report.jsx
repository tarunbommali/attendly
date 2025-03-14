/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rollList } from "../utils/rollList";
import { ReportTable } from "../components/report/ReportTable";

function Report() {
  const [studentReport, setStudentReport] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendance")) || {};

    const classesCount = Object.keys(storedData).length;
    setTotalClasses(classesCount);

    const studentMap = {};

    Object.keys(storedData).forEach((date) => {
      storedData[date].forEach((name) => {
        const cleanName = name.trim().toLowerCase();
        if (!studentMap[cleanName]) {
          studentMap[cleanName] = { name, presentCount: 0 };
        }
        studentMap[cleanName].presentCount += 1;
      });
    });

    const reportData = rollList.map((student) => {
      const cleanName = student.name.trim().toLowerCase();
      const attendanceData = studentMap[cleanName] || { presentCount: 0 };
      const attendancePercentage =
        classesCount > 0
          ? ((attendanceData.presentCount / classesCount) * 100).toFixed(2)
          : "0.00";

      return {
        registration: student.registrationNumber || "N/A",
        name: student.name,
        type: student.type,
        presentCount: attendanceData.presentCount,
        attendancePercentage,
      };
    });

    setStudentReport(reportData);
  }, []);

  const getColor = (percentage) => {
    if (percentage < 50) return "text-red-500";
    if (percentage < 75) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-all duration-300 mt-[-10px] ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className={`text-sm mb-4 sm:mb-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
        Student Attendance Report
      </h1>

      <ReportTable studentReport={studentReport} totalClasses={totalClasses} theme={theme} getColor={getColor} />
    </div>
  );
}

export default Report;

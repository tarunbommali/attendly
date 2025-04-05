import { useEffect, useState } from "react";
import AttendanceHistory from "../components/History/AttendanceHistory";
import { HistoryTable } from "../components/History/HistoryTable";
import { rollList } from "../utils/rollList";
import { useSelector } from "react-redux";

const History = () => {
  const [activeTab, setActiveTab] = useState("history"); // 👈 control which tab is active
  const [studentReport, setStudentReport] = useState([]);
  const [totalClasses, setTotalClasses] = useState(0);

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

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
<div className={`${isDarkTheme ? "bg-[#111827] text-white" : "bg-gray-100 text-black"} min-h-screen mt-[-10px] p-4 sm:p-6 transition-all duration-300`}>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded transition font-medium ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("report")}
          className={`px-4 py-2 rounded transition font-medium ${
            activeTab === "report"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
          }`}
        >
          Report
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "history" ? (
        <AttendanceHistory />
      ) : (
        <HistoryTable
          studentReport={studentReport}
          totalClasses={totalClasses}
          theme={theme}
          getColor={getColor}
        />
      )}
    </div>
  );
};

export default History;

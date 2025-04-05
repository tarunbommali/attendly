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
 {/* Tabs */}
 <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
        
        
        <button
            className={`text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${
              activeTab === "history"
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
                : theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}          onClick={() => setActiveTab("history")}

          >
            History
          </button>
          <button
            className={`text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${
              activeTab === "report"
                ? theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
                : theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => setActiveTab("report")}
          >
            Total Attendance Report
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

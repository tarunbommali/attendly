// Report.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import StudentCharts from "../components/report/StudentCharts";
import ReportOverview from "../components/report/ReportOverview";
import { setStudentData } from "../store/graphSlice";
import { xslsheetURL } from "../utils/constants";

function Report() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const students = useSelector((state) => state.graph.studentData);

  useEffect(() => {
    if (students.length === 0) {
      setLoading(true);
      axios
        .get(xslsheetURL)
        .then((res) => {
          dispatch(setStudentData(res.data));
        })
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => setLoading(false));
    }
  }, [dispatch, students.length]);

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-all duration-300 mt-[-10px] ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
        <button
          className={`text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${
            activeTab === "overview"
              ? theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800"
              : theme === "dark"
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
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
          Student Attendance Report
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "report" && (
          <StudentCharts students={students} loading={loading} />
        )}
        {activeTab === "overview" && <ReportOverview loading={loading} />}
      </div>
    </div>
  );
}

export default Report;

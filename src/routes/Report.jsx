import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { setStudentData } from "../store/sheetDataSlice"; // correct import
import { xslsheetURL } from "../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import StudentCharts from "../components/report/StudentCharts";
import ReportOverview from "../components/report/ReportOverview";

const reportTabs = [
  {
    id: "overview",
    displayName: "Overview",
    component: ReportOverview,
  },
  {
    id: "report",
    displayName: "Student Attendance Report",
    component: StudentCharts,
  },
];

function Report() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const students = useSelector((state) => state.sheetdata.students);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tabId } = useParams();
  const [loading, setLoading] = useState(false);

  const validTab = reportTabs.find((tab) => tab.id === tabId) ? tabId : "overview";

  useEffect(() => {
    // Only fetch if students array is empty
    if (students.length === 0) {
      setLoading(true);
      axios
        .get(xslsheetURL)
        .then((res) => dispatch(setStudentData(res.data)))
        .catch((err) => console.error("Error fetching data:", err))
        .finally(() => setLoading(false));
    }
  }, [dispatch, students.length]); // very important dependency

  const ActiveComponent = reportTabs.find((tab) => tab.id === validTab)?.component;

  const themeClass = isDarkTheme ? "dark" : "light";

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-all duration-300 mt-[-10px] ${
        themeClass === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Tabs */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 border-b pb-2 border-gray-300 dark:border-gray-700">
        {reportTabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${
              validTab === tab.id
                ? themeClass === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-800"
                : themeClass === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
            onClick={() => navigate(`/xlsx-report/${tab.id}`)}
          >
            {tab.displayName}
          </button>
        ))}
      </div>

      {/* Active Component Render */}
      <div>
        {ActiveComponent &&
          (validTab === "report" ? (
            <ActiveComponent students={students} loading={loading} />
          ) : (
            <ActiveComponent loading={loading} />
          ))}
      </div>
    </div>
  );
}

export default Report;

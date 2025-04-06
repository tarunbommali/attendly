/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const StudentStatsChart = ({ rollList, presentsDetails }) => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  // Theme-based colors
  const COLORS = theme === "dark"
    ? ["#00E6B7", "#FF944D"] // Present, Absent in dark
    : ["#00C49F", "#FF8042"]; // Present, Absent in light

  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const shadowColor = theme === "dark" ? "shadow-gray-700" : "shadow-gray-300";

  // Count of regular students
  const totalRegular = rollList.filter((s) => s.type === "Regular").length;
  const presentCount = presentsDetails.length;
  const absentCount = totalRegular - presentCount;

  const pieData = [
    { name: "Presents", value: presentCount },
    { name: "Absents", value: absentCount },
  ];

  return (
    <div className={`w-full p-4 rounded-xl  border-white shadow-md ${cardBg} ${shadowColor}`}>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64 sm:h-72 lg:h-[22rem] lg:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkTheme ? "#2D2D2D" : "#FFF",
                  borderColor: isDarkTheme ? "#555" : "#DDD",
                  color: isDarkTheme ? "#FFF" : "#333",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Present / Absent Count */}
        <div className={`flex flex-col gap-4 text-sm font-semibold text-center lg:text-left ${textColor}`}>
          <span className="text-green-500 text-base sm:text-lg lg:text-xl">
            ✅ Presents: {presentCount}
          </span>
          <span className="text-orange-400 text-base sm:text-lg lg:text-xl">
            ❌ Absents: {absentCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentStatsChart;

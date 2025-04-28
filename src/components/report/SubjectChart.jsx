/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded shadow-md dark:bg-gray-200 dark:text-black">
        {`${label}: ${parseFloat(payload[0].value.toFixed(2))}%`}
      </div>
    );
  }
  return null;
};
const ShimmerChart = ({ theme }) => {
  const isDark = theme === "dark";
  return (
    <div
      className={`w-full md:h-96 h-[400px] mb-10 p-4 rounded-2xl shadow-lg animate-pulse ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } h-6 w-40 rounded mb-4`}
      />
      <div
        className={`${
          isDark ? "bg-gray-700" : "bg-gray-300"
        } h-5 w-60 rounded mb-6`}
      />
      <div
        className={`${isDark ? "bg-gray-800" : "bg-gray-300"} h-60 rounded`}
      />
    </div>
  );
};

const SubjectChart = ({ student, loading = false }) => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  if (loading) return <ShimmerChart theme={theme} />;

  const {
    dbms_percentage,
    cn_percentage,
    java_percentage,
    daa_percentage,
    ai_percentage,
    es_percentage,
    dbms_lab_percentage,
    cn_lab_percentage,
    java_lab_percentage,
    bridge_percentage,
    total_hours,
    total_hours_percentage,
    ["Name of the Student"]: studentName,
    ["ROLL NUMBER"]: rollNumber,
  } = student;

  const data = [
    { subject: "DBMS", percent: +dbms_percentage },
    { subject: "CN", percent: +cn_percentage },
    { subject: "JAVA", percent: +java_percentage },
    { subject: "DAA", percent: +daa_percentage },
    { subject: "AI", percent: +ai_percentage },
    { subject: "ES", percent: +es_percentage },
    { subject: "DBMS Lab", percent: +dbms_lab_percentage },
    { subject: "CN Lab", percent: +cn_lab_percentage },
    { subject: "JAVA Lab", percent: +java_lab_percentage },
    { subject: "BRIDGE", percent: +bridge_percentage },
  ].sort((a, b) => b.percent - a.percent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full md:h-96 h-[400px] mb-10 p-4 rounded-2xl shadow-md border-2 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between text-base md:text-lg font-semibold mb-4 gap-1 md:gap-0">
        <div
          className={`${
            parseFloat(total_hours_percentage) < 75
              ? "text-red-500"
              : theme === "dark"
              ? "text-white"
              : "text-gray-800"
          }`}
        >
          {rollNumber} - {studentName}
        </div>
        <div
          className={`font-normal text-sm md:text-base ${
            isDarkTheme ? "text-white" : "text-gray-800"
          }`}
        >
          Total: {parseFloat(total_hours_percentage).toFixed(2)}%, Hours:{" "}
          {total_hours}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "600px", height: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis
                dataKey="subject"
                tick={{
                  fontSize: 12,
                  fill: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{
                  fontSize: 12,
                  fill: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "transparent" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  fontSize: 12,
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              <ReferenceLine
                y={50}
                stroke="green"
                strokeDasharray="4 4"
                label={{
                  value: "Required (50%)",
                  position: "right",
                  fontSize: 12,
                  fill: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
              <Bar
                dataKey="percent"
                isAnimationActive={true}
                animationDuration={1000}
                animationBegin={300}
                animationEasing="ease-out"
                radius={[6, 6, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percent < 50 ? "#ef4444" : "#22c55e"} // red-500 or green-500
                    stroke="none"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectChart;

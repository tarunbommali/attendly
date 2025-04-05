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

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-3 py-1 rounded shadow-md">
        {`${label}: ${parseFloat(payload[0].value.toFixed(2))}%`}
      </div>
    );
  }
  return null;
};

const ShimmerChart = () => (
  <div className="w-full md:h-96 h-[400px] mb-10 p-4 rounded-2xl shadow-md bg-gray-100 dark:bg-gray-800 animate-pulse">
    <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
    <div className="h-5 w-60 bg-gray-300 rounded mb-6" />
    <div className="h-60 bg-gray-300 rounded" />
  </div>
);

const SubjectChart = ({ student, loading = false }) => {
  if (loading) return <ShimmerChart />;

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
    <div className="w-full md:h-96 h-[400px] mb-10 p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900 border-r-2 border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:justify-between text-base md:text-lg font-semibold mb-4 gap-1 md:gap-0">
        <div className={`${parseFloat(total_hours_percentage) < 75 ? 'text-red-600' : 'text-gray-800 dark:text-white'}`}>
          {rollNumber} - {studentName}
        </div>
        <div className="font-normal text-sm md:text-base text-gray-600 dark:text-gray-300">
          Total: {parseFloat(total_hours_percentage).toFixed(2)}%, Hours: {total_hours}
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div style={{ minWidth: "600px", height: "100%" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 12 }} />
              <ReferenceLine
                y={50}
                stroke="green"
                strokeDasharray="4 4"
                label={{ value: "Required (50%)", position: "right", fontSize: 12 }}
              />
              <Bar
                dataKey="percent"
                isAnimationActive={true}
                radius={[6, 6, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percent < 50 ? "#ff4d4f" : "#4caf50"}
                    stroke="none"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubjectChart;

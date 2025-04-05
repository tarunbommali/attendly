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

const SubjectChart = ({ student }) => {
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

  // Prepare and sort data by percent descending
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
  ].sort((a, b) => b.percent - a.percent); // Sort descending

  return (
    <div className="w-full h-96 mb-10">
      <div className="flex justify-between text-lg font-bold mb-3">
         {rollNumber}, {studentName}
        <div className="text-lg font-normal">
          Total: {parseFloat(total_hours_percentage).toFixed(2)}%, Hours:{" "}
          {total_hours}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={data}>
          <XAxis dataKey="subject" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {/* Average Line at 75% */}
          <ReferenceLine
            y={75}
            stroke="green"
            strokeDasharray="4 4"
            label="Required (75%)"
          />
          <Bar dataKey="percent">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.percent < 75 ? "#ff4d4f" : "#4caf50"} // Red if < 75, Green otherwise
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectChart;

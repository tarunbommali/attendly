/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

// Shimmer loading UI
const ShimmerOverview = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg shadow-md animate-pulse ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`h-6 rounded w-1/3 mb-4 ${
          isDark ? "bg-gray-700" : "bg-gray-300"
        }`}
      />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded w-2/3 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />
        ))}
        <div className={`h-4 rounded w-1/2 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
        <div className={`h-4 rounded w-3/4 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
      </div>
      <div className="space-y-3 mt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded w-2/3 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
          />
        ))}
        <div className={`h-4 rounded w-1/2 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
        <div className={`h-4 rounded w-3/4 ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
      </div>
    </div>
  );
};


const ReportOverview = ({ loading = false }) => {
  const students = useSelector((state) => state.graph.studentData);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  if (loading) return <ShimmerOverview theme={theme} />;

  const lowAttendanceStudents = students.filter(
    (student) => parseFloat(student.total_hours_percentage) < 75
  );

  const boysList = lowAttendanceStudents.filter(
    (student) => student.gender?.toLowerCase() === "m"
  );

  const girlsList = lowAttendanceStudents.filter(
    (student) => student.gender?.toLowerCase() === "f"
  );

  const subjectKeys = [
    "dbms_percentage",
    "cn_percentage",
    "java_percentage",
    "daa_percentage",
    "ai_percentage",
    "es_percentage",
    "dbms_lab_percentage",
    "cn_lab_percentage",
    "java_lab_percentage",
    "bridge_percentage",
  ];

  const studentsWithLowSubject = students.filter((student) =>
    subjectKeys.some((key) => parseFloat(student[key]) < 50)
  );

  const getSubjectName = (key) => {
    return key
      .replace("_percentage", "")
      .replace("dbms", "DBMS")
      .replace("cn", "CN")
      .replace("java", "JAVA")
      .replace("daa", "DAA")
      .replace("ai", "AI")
      .replace("es", "ES")
      .replace("bridge", "BRIDGE")
      .replace("lab", "Lab")
      .replace("_", " ");
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-sm sm:text-base transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        📊 Overview Report
      </h2>

      {/* Low attendance section */}
      <div className="mb-4">
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          🔻 Students with total attendance &lt; 75%:{" "}
          <span className="font-bold text-red-500">
            {lowAttendanceStudents.length}
          </span>
        </p>

        {/* Boys */}
        <div
          className={`ml-4 mt-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          👦 Boys: <span className="font-semibold">{boysList.length}</span>
          <ul className="list-disc list-inside pl-2 mt-1">
            {boysList.map((boy) => (
              <li key={boy["ROLL NUMBER"]}>
                {boy["ROLL NUMBER"]} - {boy["Name of the Student"]} [
                {parseFloat(boy.total_hours_percentage).toFixed(2)}%]
              </li>
            ))}
          </ul>
        </div>

        {/* Girls */}
        <div
          className={`ml-4 mt-2 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          👧 Girls: <span className="font-semibold">{girlsList.length}</span>
          <ul className="list-disc list-inside pl-2 mt-1">
            {girlsList.map((girl) => (
              <li key={girl["ROLL NUMBER"]}>
                {girl["ROLL NUMBER"]} - {girl["Name of the Student"]} [
                {parseFloat(girl.total_hours_percentage).toFixed(2)}%]
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Low subject section */}
      <div className="mt-4">
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          ⚠️ Students with &lt; 50% in any subject:
        </p>
        <ul
          className={`ml-4 mt-1 list-disc ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {studentsWithLowSubject.map((student) => {
            const lowSubjects = subjectKeys
              .filter((key) => parseFloat(student[key]) < 50)
              .map(getSubjectName);

            return (
              <li key={student["ROLL NUMBER"]} className="mb-2">
                <span className="font-semibold">
                  {student["ROLL NUMBER"]} - {student["Name of the Student"]}
                </span>
                <div className="ml-4 text-sm">
                  <span className="font-medium">Subjects &lt; 50%:</span>{" "}
                  {lowSubjects.join(", ")}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReportOverview;

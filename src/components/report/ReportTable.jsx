/* eslint-disable react/prop-types */
export const ReportTable = ({ studentReport, totalClasses, theme, getColor }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg text-sm sm:text-base">
          <thead>
            <tr className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-300 text-gray-900"}`}>
              <th className="p-2 sm:p-3 border">Roll No</th>
              <th className="p-2 sm:p-3 border">Name</th>
              <th className="p-2 sm:p-3 border">Total Classes: {totalClasses}</th>
              <th className="p-2 sm:p-3 border hidden md:block">Attendance Percentage</th>
            </tr>
          </thead>
          <tbody>
            {studentReport.length > 0 ? (
              studentReport.map((student, index) => (
                <tr
                  key={index}
                  className={`${
                    student.type === "Detained"
                      ? "bg-[#3c3c3c] text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-900"
                  } hover:bg-gray-500 transition-all`}
                >
                  <td className="p-2 sm:p-3 border text-center">{student.registration}</td>
                  <td className="p-2 sm:p-3 border">{student.name}</td>
                  <td className="p-2 sm:p-3 border text-center">
                    <span className="block sm:inline font-bold text-blue-500">{student.presentCount}</span>
                    <span className={`block sm:hidden ${getColor(student.attendancePercentage)}`}>
                      ({student.attendancePercentage}%)
                    </span>
                  </td>
                  <td className={`p-2 sm:p-3 border text-center hidden sm:table-cell ${getColor(student.attendancePercentage)}`}>
                    {student.attendancePercentage}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
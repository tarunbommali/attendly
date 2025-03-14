/* eslint-disable react/prop-types */
export const AttendanceView = ({ attendanceHistory, selectedDate, theme,setSelectedDate }) => {
    return (
        <><h2 className="text-xl font-semibold mb-3">
        Attendance on {selectedDate}
      </h2>
      <div className={`p-4 rounded-lg shadow ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        {attendanceHistory[selectedDate]?.map((name, index) => (
          <p key={index} className={`py-1 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
            {name}
          </p>
        ))}
      </div>
      <button
            onClick={() => setSelectedDate(null)}
            className={`mt-4 px-5 py-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-blue-500 hover:bg-blue-400 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Back to History
          </button>
      </>
    );
  };
  
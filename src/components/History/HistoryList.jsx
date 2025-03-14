/* eslint-disable react/prop-types */
export const HistoryList = ({ attendanceHistory, setSelectedDate, theme }) => {
    return (
      <div className="grid gap-3">
        {Object.keys(attendanceHistory).length > 0 ? (
          Object.entries(attendanceHistory).map(([date, students]) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex justify-between items-center p-3 rounded-lg transition ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              <span className="font-medium">{date}</span>
              <span
                className={`${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Present: {students.length}
              </span>
            </button>
          ))
        ) : (
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            No attendance records found.
          </p>
        )}
      </div>
    );
  };
  
/* eslint-disable react/prop-types */
export const HistoryList = ({ attendanceHistory, setSelectedDate, theme }) => {
  // Sort properly even if day or month is not zero-padded
  const sortedDates = Object.keys(attendanceHistory).sort((a, b) => {
    const parseDate = (str) => {
      const [dd, mm, yyyy] = str.split("/").map(Number);
      return new Date(yyyy, mm - 1, dd);
    };

    return parseDate(b) - parseDate(a); // latest date first
  });

  return (
    <div className="grid gap-3">
      {sortedDates.length > 0 ? (
        sortedDates.map((date) => (
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
              Present: {attendanceHistory[date].length}
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

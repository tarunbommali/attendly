/* eslint-disable react/prop-types */
const AttendanceList = ({
    rollList,
    presentsDetails,
    toggleAttendance,
    displayStyle,
    theme,
    attendanceSubmitted,
  }) => {
    return (
      <div className="flex flex-wrap gap-3 px-4">    
        {rollList.map((item, index) => {
          const isPresent = presentsDetails.includes(item.name);
          const isDetained = item.type === "Detained";
          const buttonClass = `px-4 py-2 rounded-lg font-medium transition flex justify-center items-center ${
            isDetained
              ? "bg-black text-white cursor-not-allowed"  // Detained students
              : isPresent
              ? "bg-green-500 text-white"
              : theme === "dark"
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-900 hover:bg-gray-300"
          }`
  
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => !isDetained && toggleAttendance(item.name)}
              disabled={isDetained || attendanceSubmitted}  // Disable detained students
              style={{
                width: displayStyle === "number" ? "46px" : "auto", 
                minWidth: "44px", 
              }}
            >
              {displayStyle === "number" // Display style
                ? item.registrationNumber.slice(-2)
                : `${item.registrationNumber.slice(-2)} ${item.name}`}
            </button>
          );
        })}
      </div>
    );
  };
  
  export default AttendanceList;
  
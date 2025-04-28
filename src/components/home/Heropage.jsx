/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
 import StudentStatsChart from "./StudentStatsChart";
import AttendanceList from "./AttendanceList";
import AttendanceHeader from "./AttendanceHeader";
import { CiCalendarDate } from "react-icons/ci";
import { FaListCheck, FaDownload } from "react-icons/fa6";
import { RiSortNumberAsc } from "react-icons/ri";

const rollList = [
  {
    name: "ALLUMALLI HARSHITHA",
    type: "Regular",
    registrationNumber: "24VV1F0001",
  },
  {
    name: "AMPILLI BINDU SOWJANYA",
    type: "Detained",
    registrationNumber: "24VV1F0002",
  },
  {
    name: "BADIJANA BHAVANA",
    type: "Regular",
    registrationNumber: "24VV1F0003",
  },
  {
    name: "BAIPALLI PRADEEP",
    type: "Regular",
    registrationNumber: "24VV1F0004",
  },
  {
    name: "BATTI MANOJ KUMAR",
    type: "Regular",
    registrationNumber: "24VV1F0005",
  },
  {
    name: "BHAGAVAN PAVAN",
    type: "Regular",
    registrationNumber: "24VV1F0006",
  },
  {
    name: "BHARANIKALA NAGA MANIKANTA",
    type: "Detained",
    registrationNumber: "24VV1F0007",
  },
  {
    name: "BOMMALI TARUN",
    type: "Regular",
    registrationNumber: "24VV1F0008",
  },
  {
    name: "BOPPADAPU GOVINDHA",
    type: "Regular",
    registrationNumber: "24VV1F0009",
  },
  {
    name: "BURIDI DINESH VENKAT",
    type: "Regular",
    registrationNumber: "24VV1F0010",
  },
  {
    name: "CHAPPA RUPA",
    type: "Regular",
    registrationNumber: "24VV1F0011",
  },
  {
    name: "CHEEPURUPALLI BHAVANA",
    type: "Regular",
    registrationNumber: "24VV1F0012",
  },
  {
    name: "DASARI JEETENDRA",
    type: "Regular",
    registrationNumber: "24VV1F0013",
  },
  {
    name: "DESETTI HEMANTH",
    type: "Regular",
    registrationNumber: "24VV1F0014",
  },
  {
    name: "EDAKULA SAI KUMAR",
    type: "Regular",
    registrationNumber: "24VV1F0015",
  },
  {
    name: "EDUBILLI RAMYA",
    type: "Regular",
    registrationNumber: "24VV1F0016",
  },
  {
    name: "GAVIRISETTI SANTOSHKUMAR",
    type: "Detained",
    registrationNumber: "24VV1F0017",
  },
  {
    name: "JAGANNADHA HARIKA REDDY",
    type: "Regular",
    registrationNumber: "24VV1F0018",
  },
  {
    name: "JANKE VENKATA SIVA NARAYANA REDDY",
    type: "Regular",
    registrationNumber: "24VV1F0019",
  },

  {
    name: "KARO SIDDESWARI",
    type: "Regular",
    registrationNumber: "24VV1F0020",
  },
  {
    name: "KARRI MOHANA PRIYA",
    type: "Regular",
    registrationNumber: "24VV1F0021",
  },
  {
    name: "KELLA MANASA",
    type: "Regular",
    registrationNumber: "24VV1F0022",
  },
  {
    name: "KILLI ANILKUMAR",
    type: "Regular",
    registrationNumber: "24VV1F0023",
  },
  {
    name: "KOLLU NEELIMA",
    type: "Regular",
    registrationNumber: "24VV1F0024",
  },
  {
    name: "KOTTAKKI LOKESH",
    type: "Regular",
    registrationNumber: "24VV1F0025",
  },
  {
    name: "KOTTAPALLI SRAVANI",
    type: "Regular",
    registrationNumber: "24VV1F0026",
  },
  {
    name: "KUNAPALLI NAGA SAI RAMESH",
    type: "Regular",
    registrationNumber: "24VV1F0027",
  },
  {
    name: "KUNCHANAPALLI VENKATARAMYA",
    type: "Regular",
    registrationNumber: "24VV1F0028",
  },
  {
    name: "MAMIDI AMULYA",
    type: "Regular",
    registrationNumber: "24VV1F0029",
  },
  {
    name: "MASA RAJESH",
    type: "Detained",
    registrationNumber: "24VV1F0030",
  },
  {
    name: "MATURU KEERTHANA",
    type: "Regular",
    registrationNumber: "24VV1F0031",
  },
  {
    name: "MEESALA MURALI",
    type: "Regular",
    registrationNumber: "24VV1F0032",
  },
  {
    name: "MOGANAPU JYOTHI",
    type: "Regular",
    registrationNumber: "24VV1F0033",
  },
  {
    name: "MYRALA YAMINI",
    type: "Regular",
    registrationNumber: "24VV1F0034",
  },
  {
    name: "NAGASARAMU KAVERI",
    type: "Regular",
    registrationNumber: "24VV1F0035",
  },
  {
    name: "NAIDU PAVAN",
    type: "Regular",
    registrationNumber: "24VV1F0036",
  },
  {
    name: "NAKKA DEEPTHI",
    type: "Regular",
    registrationNumber: "24VV1F0037",
  },
  {
    name: "NERELLA MANOJ",
    type: "Detained",
    registrationNumber: "24VV1F0038",
  },
  {
    name: "PADALA NAGA SUBRAHMANYAM",
    type: "Regular",
    registrationNumber: "24VV1F0039",
  },
  {
    name: "PANIHARAM DHEERAJ KRISHNA PRASAD",
    type: "Regular",
    registrationNumber: "24VV1F0040",
  },
  {
    name: "PATNANA PRASANNA RANI",
    type: "Regular",
    registrationNumber: "24VV1F0041",
  },
  {
    name: "PIRIDI APARNA",
    type: "Detained",
    registrationNumber: "24VV1F0042",
  },
  {
    name: "PODILAPU PAVANI SANDHYA",
    type: "Regular",
    registrationNumber: "24VV1F0043",
  },
  {
    name: "PRAVALLIKA KALANGI",
    type: "Regular",
    registrationNumber: "24VV1F0044",
  },
  {
    name: "SAI KEERTHI AMBATI",
    type: "Detained",
    registrationNumber: "24VV1F0045",
  },
  {
    name: "SAMPATHIRAO NANDINI",
    type: "Detained",
    registrationNumber: "24VV1F0046",
  },
  {
    name: "SHAIK MAHAMMAD",
    type: "Regular",
    registrationNumber: "24VV1F0047",
  },
  {
    name: "TADANGI AVINASH",
    type: "Regular",
    registrationNumber: "24VV1F0048",
  },
  {
    name: "TADDI SATEESH",
    type: "Detained",
    registrationNumber: "24VV1F0049",
  },
  {
    name: "THOPALA LOKESH",
    type: "Detained",
    registrationNumber: "24VV1F0050",
  },
  {
    name: "THUTA DILEEP",
    type: "Regular",
    registrationNumber: "24VV1F0051",
  },
  {
    name: "TIRUPATHI YASHWANTH KUMAR",
    type: "Regular",
    registrationNumber: "24VV1F0052",
  },
  {
    name: "VELAMALA SAI SUSHMA",
    type: "Regular",
    registrationNumber: "24VV1F0053",
  },
  {
    name: "YADLA NARASIMHA",
    type: "Regular",
    registrationNumber: "24VV1F0054",
  },
  {
    name: "YEDDU RAVI KIRAN",
    type: "Regular",
    registrationNumber: "24VV1F0055",
  },
  {
    name: "AMARAPU BHANU PRASAD",
    type: "Regular",
    registrationNumber: "24VV1F0056",
  },
  {
    name: "APPIKONDA JYOTHI",
    type: "Regular",
    registrationNumber: "24VV1F0057",
  },
  {
    name: "DARBHAMULLA JAHNAVI",
    type: "Regular",
    registrationNumber: "24VV1F0058",
  },
  {
    name: "KADIYAM VYSALI",
    type: "Regular",
    registrationNumber: "24VV1F0059",
  },
  {
    name: "MAJJI GOWRISANKAR",
    type: "Regular",
    registrationNumber: "24VV1F0060",
  },
  {
    name: "MERUPULA ANURADHA",
    type: "Regular",
    registrationNumber: "24VV1F0061",
  },
  {
    name: "POTNURU GNANESWAR RAO",
    type: "Regular",
    registrationNumber: "24VV1F0062",
  },
  {
    name: "SESAPU ROOPA",
    type: "Regular",
    registrationNumber: "24VV1F0063",
  },
  {
    name: "TADDI CHANDRA SEKHAR",
    type: "Regular",
    registrationNumber: "24VV1F0064",
  },
  {
    name: "VEMULA SUSHMA",
    type: "Regular",
    registrationNumber: "24VV1F0065",
  },
]

const Heropage1 = () => { 
  const [presentsDetails, setPresentsDetails] = useState([]);
  const [displayStyle, setDisplayStyle] = useState("number");
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);


  const today = new Date();
  const todayDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[today.getDay()];

  const dayColors = {
    Sun: "text-red-500",
    Mon: "text-blue-500",
    Tue: "text-green-500",
    Wed: "text-yellow-500",
    Thu: "text-purple-500",
    Fri: "text-pink-500",
    Sat: "text-orange-500",
  };

  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  useEffect(() => {
    const savedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};
    if (savedAttendance[todayDate]) {
      setPresentsDetails(savedAttendance[todayDate]);
      setAttendanceSubmitted(true);
    } else {
      setAttendanceSubmitted(false);
    }
  }, [todayDate]);

  const toggleDisplayStyle = () => {
    setDisplayStyle((prev) => (prev === "number" ? "number + name" : "number"));
  };

  const toggleAttendance = (name) => {
    if (!attendanceSubmitted) {
      setPresentsDetails((prev) =>
        prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
      );
    }
  };
  const handleSubmit = () => {
    const attendanceData = JSON.parse(localStorage.getItem("attendance")) || {};
    attendanceData[todayDate] = presentsDetails;
    localStorage.setItem("attendance", JSON.stringify(attendanceData));

    // ✅ Show different messages based on whether it's a first-time submit or an update
    setToastMessage(
      attendanceSubmitted
        ? "Attendance updated successfully! ✏️"
        : "Attendance saved successfully! ✅"
    );
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);

    setAttendanceSubmitted(true);
  };

  const handleEdit = () => {
    setAttendanceSubmitted(false);
  };

  const handleDownload = () => {
    alert("Downloading attendance data...");
  };

  const handleExportPDF = () => {
    alert("Exporting attendance as PDF...");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`min-h-screen p-2 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`pt-2 px-2 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        <AttendanceHeader
          todayDate={todayDate}
          toggleDisplayStyle={toggleDisplayStyle}
          displayStyle={displayStyle}
          theme={theme}
          rollList={rollList}
          attendanceSubmitted={attendanceSubmitted}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold  dark:text-white">
          <CiCalendarDate
            size={22}
            className={theme == "dark" ? "text-white" : "text-black"}
          />
          <span className={dayColors[day]}>
            Today Attendance: {day}, {todayDate}
          </span>
        </h2>

        <div className="flex gap-2 items-center relative">
          {!attendanceSubmitted ? (
            <button
              onClick={toggleDisplayStyle}
              className={`p-2 rounded transition ${
                theme === "dark"
                  ? "text-white hover:bg-gray-600"
                  : "text-black hover:bg-gray-300"
              }`}
              title="Toggle Display"
            >
              {displayStyle === "number" ? (
                <FaListCheck size={18} />
              ) : (
                <RiSortNumberAsc size={18} />
              )}
            </button>
          ) : (
            <div className="relative inline-block text-left">
              <div
                onClick={toggleDropdown}
                tabIndex={0}
                role="button"
                className={`p-2 rounded transition cursor-pointer ${
                  theme === "dark"
                    ? "text-white hover:bg-gray-600"
                    : "text-black hover:bg-gray-300"
                }`}
                title="Download Options"
              >
                <FaDownload size={18} />
              </div>

              {dropdownOpen && (
                <ul
                  className={`absolute right-0 mt-2 w-52 rounded-md z-10 shadow-lg border transition-all duration-150
                    ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                >
                  <li>
                    <a
                      onClick={handleDownload}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Download
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={handleExportPDF}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      Export as PDF
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {attendanceSubmitted ? (
        <StudentStatsChart
          rollList={rollList}
          presentsDetails={presentsDetails}
        />
      ) : (
        <AttendanceList
          rollList={rollList}
          presentsDetails={presentsDetails}
          toggleAttendance={toggleAttendance}
          displayStyle={displayStyle}
          theme={theme}
          attendanceSubmitted={attendanceSubmitted}
          todayDate={todayDate}
        />
      )}
      {showToast && (
        <div className="toast toast-center toast-bottom z-50">
          <div className="alert alert-success w-[400px] px-4 py-2 shadow-md rounded-md">
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heropage1;

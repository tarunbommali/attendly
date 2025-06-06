/* eslint-disable react/prop-types */
import { navMenuList } from "../../utils/navMenuList";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X } from "lucide-react";
import { toggleSidebar } from "../../store/sidebarSlice";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { toggleTheme } from "../../store/themeSlice";
import { IoMdLogOut } from "react-icons/io";
import { clearUserDetails } from "../../store/userSlice";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.sidebar.expanded);
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const theme = isDarkTheme ? "dark" : "light";

  const sidebarRef = useRef(null);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const renderThemeController = () => (
    <label className="swap swap-rotate" onChange={handleToggle}>
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className="theme-controller" value="synthwave" />

      {/* sun icon */}
      <svg
        className="swap-off h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* moon icon */}
      <svg
        className="swap-on h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
  const onHandleLogout = () => {
    localStorage.removeItem("userDetails");
    dispatch(clearUserDetails()); // redux
    setShowToast(true); // show toast

    setTimeout(() => {
      setShowToast(false);
      window.location.href = "/login"; // redirect
    }, 1500); // 1.5 seconds delay
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-6   py-2 md:py-4  shadow-md z-50 transition-colors ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-[#1d232a] text-white"
        }`}
      >
        <h1 className="text-xl font-bold">Attendly.</h1>
        <nav className="hidden md:flex items-center space-x-6">
          {navMenuList.map((item, index) => {
            const isActive = currentPath === item.pathname;

            return (
              <Link
                key={index}
                to={item.pathname}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-500" // Active styling
                    : isDarkTheme
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.displayText}
              </Link>
            );
          })}

          {renderThemeController()}
          <button onClick={() => onHandleLogout()}>
            <IoMdLogOut />
          </button>
        </nav>
        <div className="md:hidden flex items-center">
          {renderThemeController()}
          <button
            className="mx-2 p-2 rounded-lg"
            onClick={() => dispatch(toggleSidebar())}
          >
            {expanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      {/* Sidebar for mobile view */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 shadow-md transform transition-transform duration-300 md:hidden z-50 ${
          expanded ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "light"
            ? "bg-white text-gray-900"
            : "bg-gray-900 text-white"
        }`}
      >
        <nav className="flex flex-col p-4">
          {navMenuList.map((item, index) => {
            const isActive = currentPath === item.pathname;

            return (
              <Link
                key={index}
                to={item.pathname}
                onClick={() => dispatch(toggleSidebar())}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${
                  isActive
                    ? "text-indigo-600 "
                    : isDarkTheme
                    ? "text-gray-300 hover:text-indigo-400"
                    : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {item.displayText}
              </Link>
            );
          })}

          <button
            className="flex px-3 py-2"
            onClick={() => {
              dispatch(toggleSidebar()); 
              onHandleLogout();
            }}
          >
            Logout
          </button>
        </nav>
      </aside>
      {showToast && (
        <div className="toast toast-center z-[999]">
          <div className="alert alert-error">
            <span>Logged out successfully.</span>
          </div>
        </div>
      )}

      <div className="pt-16"></div>
    </>
  );
}

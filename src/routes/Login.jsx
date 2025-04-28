import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: "",
    semester: "",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { department, semester } = formData;

    if (!department || !semester) {
      alert("Please select both department and semester");
      return;
    }

    localStorage.setItem(
      "userDetails",
      JSON.stringify({ department, semester })
    );
    dispatch(setUserDetails({ department, semester }));

    setShowToast(true); // ✅ Show toast
    setTimeout(() => {
      setShowToast(false);
      navigate("/"); // ✅ Redirect
    }, 1500);
  };

  return (
    <section className={`${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Login to Attendly.One
            </h1>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              JNTU-GV
            </span>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">-- Select Department --</option>
                  <option value="MCA">MCA</option>
                  
                </select>
              </div>

              <div>
                <label
                  htmlFor="semester"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Semester
                </label>
                <select
                  name="semester"
                  id="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">-- Select Semester --</option>
                  
                  <option value="2">2</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
            </form>
            {showToast && (
              <div className="toast toast-center z-[999]">
                <div className="alert alert-success">
                  <span>Login successful!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

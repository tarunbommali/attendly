import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    department: 'MCA',
    semester: '1',
  });

  // Optional: Also apply theme class to <html> tag (for global dark mode support)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { department, semester, teacherId } = formData;

    const userInfo = {
      department,
      semester,
      teacherId,
    };

    localStorage.setItem('userDetails', JSON.stringify(userInfo));
    console.log('Login successful. Redirecting...');
    navigate('/'); // ✅ Redirect to home after login
  };

  return (
    <section className={`${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to Attendly.One
            </h1>
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
                  <option value="2">2</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

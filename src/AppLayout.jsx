import { useSelector } from "react-redux";
import Navbar from "./components/global/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/global/Footer";
import ScrollToTopButton from "./components/global/ScrollToTopButton";
import { rollList } from "./utils/rollList";

export const AppLayout = () => {
    const department = useSelector((state) => state.loggedUser?.department);
    const semester = useSelector((state) => state.loggedUser?.semester);
  
    const getStudentRollList = (department, semester) => {
      const deptMatch = rollList.find(
        (item) =>
          item.department === department &&
          item.semester.includes(Number(semester))
      );
      return deptMatch?.rollList || [];
    };
  
    const studentRollList = getStudentRollList(department, semester);
  console.log(studentRollList)
    return (
      <>
        <Navbar />
        <Outlet context={{ department, semester, studentRollList }} />
        <Footer />
        <ScrollToTopButton />
      </>
    );
  };
  
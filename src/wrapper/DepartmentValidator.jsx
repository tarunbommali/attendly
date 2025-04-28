/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { rollList } from "../utils/rollList";

 const DepartmentValidator = ({ Component, ...rest }) => {
    const department = useSelector((state) => state.loggedUser?.department);
    const semester = useSelector((state) => state.loggedUser?.semester);
   




    const matchedDept = rollList.find(
      (item) =>
        item.department === department &&
        item.semester.includes(Number(semester))
    );
  
    if (!matchedDept) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <div className="bg-red-100 text-red-800 px-6 py-4 rounded-lg shadow-md max-w-md">
            <h2 className="text-lg font-semibold">Invalid Department or Semester</h2>
            <p className="mt-2 text-sm">
              This department or semester is not added yet. Please contact the admin.
            </p>
          </div>
        </div>
      );
    }
  
    return <Component rollList={matchedDept.rollList} {...rest} />;
  };
  

  export default DepartmentValidator;
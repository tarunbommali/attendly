// src/components/StudentCharts.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStudentData } from "../../store/graphSlice"; 
import SubjectChart from "./SubjectChart"; 
import { xslsheetURL } from "../../utils/constants";

const StudentCharts = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.graph.studentData);

  console.log("Students data:", students[0]);
   useEffect(() => {
    if (students.length === 0) {
      axios.get(xslsheetURL)
        .then(res => {
          dispatch(setStudentData(res.data));
        })
        .catch(err => {
          console.error("Error fetching student data:", err);
        });
    }
  }, [dispatch, students.length]);

  return (
    <div className="p-4">
      {students.map((student) => (
        <SubjectChart key={student["ROLL NUMBER"]} student={student} />
      ))}
    </div>
  );
};

export default StudentCharts;

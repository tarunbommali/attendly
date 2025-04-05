// src/components/StudentCharts.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setStudentData } from "../../store/graphSlice";
import SubjectChart from "./SubjectChart";
import { xslsheetURL } from "../../utils/constants";

const StudentCharts = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.graph.studentData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (students.length === 0) {
      setLoading(true);
      axios
        .get(xslsheetURL)
        .then((res) => {
          dispatch(setStudentData(res.data));
        })
        .catch((err) => {
          console.error("Error fetching student data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [dispatch, students.length]);

  return (
    <div className="px-2">
      {loading
        ? // Show 3 shimmer charts while loading
          [...Array(3)].map((_, idx) => <SubjectChart key={idx} loading={true} />)
        : // Show actual student charts
          students.map((student) => (
            <SubjectChart key={student["ROLL NUMBER"]} student={student} />
          ))}
    </div>
  );
};

export default StudentCharts;

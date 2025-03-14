/* eslint-disable react/prop-types */
import { TiGroup } from "react-icons/ti";
import StatsContainer from "./StatsContainer";

const StudentStats = ({ rollList, presentsDetails }) => {
 
  return (
    <div className="flex flex-wrap  gap-2">
      {/* Total Students */}
      <StatsContainer
        bgColorLight="btn btn-active btn-success"
        bgColorDark="bg-blue-700"
        text={<TiGroup />}
        value={`Total: ${rollList.length}`}
        
      />

      {/* Regular Students */}
      <StatsContainer
        bgColorLight="btn btn-active btn-info"
        bgColorDark="bg-green-700"
        text={<TiGroup />}
        value={`Regular: ${rollList.filter((s) => s.type === "Regular").length}`}
        
      />

      {/* Present Students */}
      <StatsContainer
        bgColorLight="btn btn-active btn-accent"
        bgColorDark="bg-teal-700"
        text={<TiGroup />}
        value={`Presents: ${presentsDetails.length}`}
        
      />

      {/* Absent Students */}
      <StatsContainer
        bgColorLight="btn btn-active btn-error"
        bgColorDark="bg-red-700"
        text={<TiGroup />}
        value={`Absents: ${
          rollList.filter((s) => s.type === "Regular").length -
          presentsDetails.filter((name) =>
            rollList.some((s) => s.name === name && s.type === "Regular")
          ).length
        }`}
        
      />
    </div>
  );
};

export default StudentStats;

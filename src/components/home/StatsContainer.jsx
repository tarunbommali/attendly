/* eslint-disable react/prop-types */

const StatsContainer = ({
  bgColorLight,
  bgColorDark,
  text,
  value,
  isDarkTheme,
}) => {
  const themeColor = isDarkTheme ? bgColorDark : bgColorLight;

  return (
    <button
      className={`btn btn-soft ${themeColor} text-white w-full justify-start  px-2 flex flex-row items-center  text-lg md:text-xl md:w-1/5 font-semibold  rounded-lg shadow-md`}
    >
      <span className="mx-1">{text}</span>
      <span className="italic">{value}</span>
    </button>
  );
};

export default StatsContainer;

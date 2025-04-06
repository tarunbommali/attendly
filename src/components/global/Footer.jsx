import { useSelector } from "react-redux";
import { PORTFOLIO_URL } from "../../utils/constants";

const Footer = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);
  const theme = isDarkTheme ? "dark" : "light";

  return (
    <footer
      className={`footer sm:footer-horizontal footer-center p-4 transition ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      <aside>
        <p>
          No Copyright © {new Date().getFullYear()} - Designed and Developed by{" "}
          <a
            href={PORTFOLIO_URL}
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${
              theme === "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            Tarun
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;

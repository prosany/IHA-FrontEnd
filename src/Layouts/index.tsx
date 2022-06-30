import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

// User has switched back to the tab
const onFocus = () => {
  console.log("Tab is in focus");
};

// User has switched away from the tab
const onBlur = () => {
  console.log("Tab is blurred");
};

const Layout: React.FC<IProps> = ({ children }) => {
  const location = useLocation();
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    onFocus();
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  useEffect(() => {
    let currentPage = capitalizeFirstLetter(location.pathname);
    document.title = (currentPage || "Home") + " | Instructor Hiring App";
  }, [location.pathname]);
  return (
    <React.Fragment>
      <main>{children}</main>
    </React.Fragment>
  );
};

export default Layout;

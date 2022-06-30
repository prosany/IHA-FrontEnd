/* eslint-disable jsx-a11y/aria-role */
import React from "react";

interface IProps {
  style?: React.CSSProperties;
  text?: string;
}

const Spinner: React.FC<IProps> = ({ style, text }) => {
  return (
    <div className="nprogress">
      <div className="spinners" role="spinners">
        <div className="spinner-icon" style={style}></div>
        {text ? <div className="ms-2">{text}</div> : ""}
      </div>
    </div>
  );
};

export default Spinner;

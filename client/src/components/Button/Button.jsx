import React from "react";
import PropTypes from "prop-types";

import "./button.css";

const Button = ({ label, onClick, arrow, warning }) => {
  return (
    <>
      {warning?.isWarning && <div className="buttonWarning">{warning?.warningText}</div>}
      <button onClick={onClick}>
        {label} {arrow && <span className="loginArrow">&rarr;</span>}
      </button>
    </>
    
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick : PropTypes.func.isRequired,
  warning : PropTypes.object,
};


export default Button;


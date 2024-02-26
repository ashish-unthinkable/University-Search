import React from "react";
import PropTypes from "prop-types";

import "./input.css";

const Input = ({
  label,
  type,
  placeholder,
  required,
  onChange,
  warning,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        style={!required ? { background: "inherit" } : {}}
        onChange={onChange}
      />
      {warning && <div className="warningDiv">{label} is empty</div>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  warning: PropTypes.bool,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  warning: false,
};

export default Input;

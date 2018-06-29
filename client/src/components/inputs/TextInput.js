import React from "react";

const TextInput = ({
  name,
  label,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  const styleName = !error
    ? "form-control form-control-lg m-0 mt-2"
    : "form-control form-control-lg m-0 mt-2 is-invalid";

  return (
    <div className="mb-3">
      <label className="p-0 m-0 text-muted">
        <small>{label}</small>
      </label>
      <input
        type={type}
        className={styleName}
        placeholder={placeholder}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text"
};

export default TextInput;

import React from "react";

const Select = React.forwardRef(
  ({ title = "", children, optionData = [], onChange }, ref) => {
    return (
      <>
        <label className="mb-2" ref={ref}>
          {title}
        </label>
        <select className="form-select p-1 mb-3" onChange={onChange}>
          {optionData.map((item, index) => children(item, index))}
        </select>
      </>
    );
  }
);

export default Select;

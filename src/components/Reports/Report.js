import React from "react";

const Report = ({ calculation }) => {
  return (
    <div className="calculation">
      <span className="commandAndResult">
        {calculation.command} = {calculation.result}
      </span>
      <span className="date"> {calculation.date_added}</span>
    </div>
  );
};

export default Report;

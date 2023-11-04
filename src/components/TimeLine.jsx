import React, { memo } from "react";

const TimeLine = memo(({ data, children }) => {
  return (
    <ul className="timeline mt-2 mb-0">
      {data.map((item, index) => (
        <li className="timeline-item" key={index}>
          {children(item, index)}
        </li>
      ))}
    </ul>
  );
});

export default TimeLine;

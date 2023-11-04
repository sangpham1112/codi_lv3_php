import React, { memo } from "react";

const TableColumn = memo(({ data }) => {
  return (
    <table className="table table-sm mt-2 mb-4">
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <th>{item.title}</th>
              <td>{item.desc}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default TableColumn;

import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Table = memo(
  ({
    title = "",
    tableHeader = [],
    isSearch = false,
    isNeedEdit = true,
    children,
  }) => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const handleSearchSubmit = (data) => {
      navigate("?query=" + data.search);
    };
    return (
      <>
        <div className="mb-3">
          <h1 className="h3 d-inline align-middle">{title}</h1>
        </div>
        <div className="card">
          <div className="card-header pb-0">
            <h5 className="mb-0 fs-4 card-title">{title}</h5>
            {isSearch && (
              <form
                className="float-end"
                onSubmit={handleSubmit(handleSearchSubmit)}>
                <label>Tìm kiếm:</label>
                <input
                  className="form-control form-control-sm shadow-none"
                  type="search"
                  {...register("search")}
                />
              </form>
            )}
          </div>
          <div className="card-body">
            <table
              className="table table-responsive table-striped"
              width="100%">
              <thead align="center">
                <tr>
                  <th>#</th>
                  {tableHeader.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                  {isNeedEdit && <th>Tuỳ chỉnh</th>}
                </tr>
              </thead>
              <tbody align="center">{children}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
);

export default Table;

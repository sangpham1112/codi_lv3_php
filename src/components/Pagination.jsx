import React, { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";

const Pagination = memo(({ isPreviousData, lastPage = 0, currentPage }) => {
  const [page, setPage] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= lastPage; i++) {
      arr = [...arr, i];
    }
    setPages(arr);
  }, [lastPage]);

  const handlePage = (page) => {
    setPage(page);
    if (page == 1) {
      navigate("");
    } else {
      navigate("?page=" + page);
    }
  };

  const handlePrevPage = () => {
    const newPage = Math.max(page - 1, 0);
    setPage(newPage);
    if (newPage == 1 && newPage > 0) {
      navigate("");
    } else if (newPage > 1) {
      navigate("?page=" + page);
    }
  };

  const handleNextPage = () => {
    if (!isPreviousData && currentPage < lastPage) {
      const newPage = page + 1;
      setPage(newPage);
      if (newPage == 1) {
        navigate("");
      } else {
        navigate("?page=" + newPage);
      }
    }
  };

  const handelActiveLink = (item) => {
    if (currentPage == null && item == 1) {
      return "page-item active";
    }
    if (currentPage == item) {
      return "page-item active";
    }
    return "page-item";
  };

  return (
    <nav className="d-flex justify-content-end">
      <ul className="pagination ">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => handlePrevPage()}
            disabled={page === 0}
            aria-label="Previous">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        {pages.map((item) => {
          return (
            <li
              className={handelActiveLink(item)}
              onClick={() => handlePage(item)}
              key={item}>
              <a className="page-link">{item}</a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => handleNextPage()}
            disabled={isPreviousData || currentPage > lastPage}
            aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Pagination;

import React, { useState } from "react";
import "./pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  pageSize,
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageItems = () => {
    return (
      <>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            tabIndex="-1"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        <li
          key={currentPage}
          className={`page-item ${currentPage === currentPage ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage)}
          >
            {currentPage}
          </a>
        </li>
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </>
    );
  };

  return (
    <nav aria-label="Page navigation example" className="paginationContainer">
      <ul className="pagination justify-content-end">{renderPageItems()}</ul>
      <div className="recordPerPage">
        <span>Records per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value)}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Pagination;

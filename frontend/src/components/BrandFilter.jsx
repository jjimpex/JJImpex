import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiX, FiFilter, FiRefreshCcw } from "react-icons/fi";

const BrandFilter = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  resetFilters,
}) => {
  const [showSort, setShowSort] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle sort selection
  const handleSort = (order) => {
    setSortOrder(order);
    setShowSort(false); // close after selection
  };

  return (
    <div className="brand-filter-bar">
      <div className="search-wrapper" ref={dropdownRef}>
        {/* Search Icon */}
        <FiSearch className="search-icon" />

        {/* Input */}
        <input
          type="text"
          placeholder="Start Typing..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="brand-search-input"
        />

        {/* Clear Button */}
        {searchTerm && (
          <FiX className="clear-icon" onClick={() => setSearchTerm("")} />
        )}

        {/* Filter Icon */}
        <FiFilter
          className={`filter-icon ${showSort ? "rotate" : ""}`}
          onClick={() => setShowSort((prev) => !prev)}
        />

        {/* Animated Dropdown */}
        <div className={`sort-dropdown ${showSort ? "show" : ""}`}>
          <div
            className={sortOrder === "asc" ? "active" : ""}
            onClick={() => handleSort("asc")}
          >
            A → Z
          </div>
          <div
            className={sortOrder === "desc" ? "active" : ""}
            onClick={() => handleSort("desc")}
          >
            Z → A
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {/* <button className="reset-btn" onClick={resetFilters}>
        Reset
      </button> */}
      <button className="reset-btn icon-only" onClick={resetFilters}>
        <FiRefreshCcw />
      </button>
    </div>
  );
};

export default BrandFilter;

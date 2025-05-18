import React from "react";
import PropTypes from "prop-types";

// החלק של החיפוש לפי שם בכרטיסיה שמתחת לכרטיסיה העליונה
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="position-relative">
      <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
        <span className="material-symbols-outlined">search</span>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="form-control ps-5 bg-white text-dark colored-placeholder"
        placeholder="Search products..."
      />
      <style>
        {" "}
        {`
        .colored-placeholder::placeholder {
          color: grey;
        }
        `}
      </style>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export { SearchBar };

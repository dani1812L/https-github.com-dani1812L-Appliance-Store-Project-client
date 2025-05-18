import React, { useContext } from "react";
import PropTypes from "prop-types";

// החלק של החיפוש לפי טווח מחירים בכרטיסיה שמתחת לכרטיסיה העליונה
const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  applyPriceRange,
}) => {
  return (
    <div className="position-relative d-flex gap-3 align-items-center">
      <div className="d-flex flex-column">
        <label htmlFor="min-price" className="form-label text-muted small mb-0">
          Min ($)
        </label>
        <input
          type="number"
          id="min-price"
          value={minPrice}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          className="form-control form-control-sm ps-2"
          min="0"
          placeholder="Min Price"
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="max-price" className="form-label text-muted small mb-0">
          Max ($)
        </label>
        <input
          type="number"
          id="max-price"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="form-control form-control-sm ps-2"
          min="0"
          placeholder="Max Price"
        />
      </div>
      <div className=" end-0 translate-middle-y pe-3">
        <button
          onClick={() => {
            applyPriceRange();
          }}
          type="submit"
          className="btn btn-primary btn-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

PriceRangeFilter.propTypes = {
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
};

export { PriceRangeFilter };

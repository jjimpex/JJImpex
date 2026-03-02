import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/brandCard.css";

const BrandCard = ({ brand, searchTerm }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brand/${brand._id}`);
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className="brand-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img
        src={`/assets/brands/${brand.image}`}
        alt={brand.name}
      />

      <h3>
        {highlightText(brand.name, searchTerm)}
      </h3>
    </div>
  );
};

export default BrandCard;
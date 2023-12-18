import React from "react";

export default function MemoryCard({
  card,
  handleSelected,
  disabled,
  rotated,
}) {
  const handleClick = () => {
    if (!disabled) {
      handleSelected(card);
    }
  };
  return (
    <div className="card">
      <div className={rotated ? "rotated" : ""}>
        <img className="cardFront" src={card.path} alt="Image" />
        <img
          className="cardBack"
          onClick={handleClick}
          src="/img/cover.jpeg"
          alt="Image"
        />
      </div>
    </div>
  );
}

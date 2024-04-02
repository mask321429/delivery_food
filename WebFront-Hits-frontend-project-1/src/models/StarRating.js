import React, { useState } from 'react';

function StarRating({ rating, onRate }) {
  const maxRating = 10; // Укажите нужное количество звёзд
  const [userRating, setUserRating] = useState(rating);

  const starElements = [];

  const handleStarClick = (newRating) => {
    if (userRating !== newRating) {
      setUserRating(newRating);
      onRate(newRating);
    }
  };

  for (let i = 1; i <= maxRating; i++) {
    const starClass = i <= userRating ? 'filled' : 'empty';
    const starColor = starClass === 'filled' ? 'gold' : 'gray';

    starElements.push(
      <span
        key={i}
        className={`star ${starClass}`}
        onClick={() => handleStarClick(i)}
        style={{ cursor: 'pointer', color: starColor }}>
        &#9733;
      </span>,
    );
  }

  return <div className="star-rating">{starElements}</div>;
}

export default StarRating;

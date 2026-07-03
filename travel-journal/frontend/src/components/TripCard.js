import React from 'react';
import './TripCard.css';

function TripCard({ trip, onView }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const startDate = formatDate(trip.startDate);
  const endDate = formatDate(trip.endDate);

  const renderRating = (rating) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  return (
    <div className="trip-card" onClick={onView}>
      <div className="trip-card-image">
        {trip.photoUrl ? (
          <img src={trip.photoUrl} alt={trip.title} />
        ) : (
          <div className="trip-card-placeholder">📸</div>
        )}
      </div>
      <div className="trip-card-content">
        <h3 className="trip-card-title">{trip.title}</h3>
        <p className="trip-card-meta">
          📅 {startDate} - {endDate}
        </p>
        <p className="trip-card-meta">📍 {trip.location}</p>
        <p className="trip-card-rating">
          {renderRating(trip.rating)}
        </p>
        {trip.excerpt && (
          <p className="trip-card-excerpt">{trip.excerpt}</p>
        )}
        <button className="trip-card-action">
          Read More →
        </button>
      </div>
    </div>
  );
}

export default TripCard;
